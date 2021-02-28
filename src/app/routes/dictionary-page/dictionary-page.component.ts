import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AslWord, AslWords } from '../../definitions/asl-words';
import { UnityService } from '../../services/unity.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { AslWordsDefinitions } from '../../definitions/asl-words-definitions';
import { WordNamePipe } from '../../pipes/word-name.pipe';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoryDefinition } from '../../types/base.types';
import { AslWordsCategories } from '../../definitions/asl-words-categories';
import { GlobalStateService } from '../../services/global-state.service';

@Component({
    selector: 'a-dictionary-page',
    templateUrl: './dictionary-page.component.html',
    styleUrls: ['./dictionary-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class DictionaryPageComponent implements OnInit {
    allWords: AslWord[] = [];
    filteredWords$ = new BehaviorSubject<AslWord[]>([]);
    filteredCategories$ = new BehaviorSubject<CategoryDefinition[]>([]);

    categoriesMode = this.userSettings.getShowCategories();
    favoritesOnly = this.userSettings.getShowOnlyFavorites();
    filterQuery = this.userSettings.getLastFilter();

    private preloadWord?: AslWord;
    private collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

    constructor(
        private unityService: UnityService,
        private userSettings: UserSettingsService,
        private wordNamePipe: WordNamePipe,
        private route: ActivatedRoute,
        private globalStateService: GlobalStateService,
    ) {}

    ngOnInit(): void {
        this.globalStateService.setQuizMode(false);

        this.allWords = AslWords.filter(word => !AslWordsDefinitions[word].hidden).sort((a, b) => {
            const aName = this.wordNamePipe.transform(a).toLocaleLowerCase();
            const bName = this.wordNamePipe.transform(b).toLocaleLowerCase();

            return this.collator.compare(aName, bName);
        });

        this.filterWords();

        this.preloadWord = this.route.snapshot.params?.word;
        this.unityService.loaded().then(() => {
            this.unityService.setSpeed(this.userSettings.getSpeed());
            if (this.preloadWord) {
                this.unityService.selectClip(this.preloadWord);
            }
        });
    }

    filterWords() {
        this.filteredWords$.next(this.filterWordsList(this.allWords));

        this.filteredCategories$.next(
            AslWordsCategories.map(category => {
                const words: AslWord[] = this.filterWordsList(category.words);
                return {
                    name: category.name,
                    words,
                };
            }).filter(category => category.words.length > 0),
        );
    }

    wordSelected(word: AslWord) {
        this.preloadWord = word;
        this.unityService.selectClip(word);
    }

    onFilterQueryChange(query: string) {
        this.filterQuery = query;
        this.userSettings.setLastFilter(query);
        this.filterWords();
    }

    onCategoriesModeChange(enabled: boolean) {
        this.categoriesMode = enabled;
        this.userSettings.setShowCategories(enabled);
    }

    onFavoritesOnlyChange(enabled: boolean) {
        this.favoritesOnly = enabled;
        this.userSettings.setShowOnlyFavorites(enabled);
        this.filterWords();
    }

    onCategoryCollapseChange(category: string, collapsed: boolean) {
        this.userSettings.setExpandedCategory(category, !collapsed);
    }

    isCategoryCollapsed(category: string) {
        return !this.userSettings.getExpandedCategories().includes(category);
    }

    getItemSize() {
        if (window.innerHeight > 900) {
            return 40 / 3;
        }
        if (window.innerHeight > 600) {
            return 40 / 2;
        }
        return 40;
    }

    private filterWordsList(words: AslWord[] | Readonly<AslWord[]>) {
        return words.filter(word => {
            const matchesFavorites = !this.favoritesOnly || this.userSettings.getFavorites().includes(word);
            const matchesQuery = this.wordNamePipe
                .transform(word)
                .toLocaleLowerCase()
                .includes(this.filterQuery.toLocaleLowerCase());
            return matchesFavorites && matchesQuery;
        });
    }
}
