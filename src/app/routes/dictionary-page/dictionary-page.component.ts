import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AslWord, AslWords } from '../../definitions/asl-words';
import { UnityService } from '../../services/unity.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { AslWordsDefinitions } from '../../definitions/asl-words-definitions';
import { WordNamePipe } from '../../pipes/word-name.pipe';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
    ) {}

    ngOnInit(): void {
        this.allWords = AslWords.filter(word => !AslWordsDefinitions[word].hidden).sort((a, b) => {
            const aName = this.wordNamePipe.transform(a).toLocaleLowerCase();
            const bName = this.wordNamePipe.transform(b).toLocaleLowerCase();

            return this.collator.compare(aName, bName);
        });

        this.filterWords();

        this.preloadWord = this.route.snapshot.params?.word;
        this.unityService.loaded().then(() => {
            if (this.preloadWord) {
                this.unityService.selectClip(this.preloadWord);
            }
        });
    }

    filterWords() {
        this.filteredWords$.next(
            this.allWords.filter(word => {
                const matchesFavorites = !this.favoritesOnly || this.userSettings.getFavorites().includes(word);
                const matchesQuery = word.toLocaleLowerCase().includes(this.filterQuery.toLocaleLowerCase());
                return matchesFavorites && matchesQuery;
            }),
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
}
