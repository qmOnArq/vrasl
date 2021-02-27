import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AslWords } from '../../definitions/asl-words';
import { UnityService } from '../../services/unity.service';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
    selector: 'a-dictionary-page',
    templateUrl: './dictionary-page.component.html',
    styleUrls: ['./dictionary-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class DictionaryPageComponent implements OnInit {
    words = AslWords;

    categoriesMode = this.userSettings.getShowCategories();
    favoritesOnly = this.userSettings.getShowOnlyFavorites();
    filterQuery = this.userSettings.getLastFilter();

    constructor(private unityService: UnityService, private userSettings: UserSettingsService) {}

    ngOnInit(): void {}

    click(word: string) {
        this.unityService.selectClip(word);
    }

    onFilterQueryChange(query: string) {
        this.filterQuery = query;
        this.userSettings.setLastFilter(query);
    }

    onCategoriesModeChange(enabled: boolean) {
        this.categoriesMode = enabled;
        this.userSettings.setShowCategories(enabled);

    }

    onFavoritesOnlyChange(enabled: boolean) {
        this.favoritesOnly = enabled;
        this.userSettings.setShowOnlyFavorites(enabled);
    }
}
