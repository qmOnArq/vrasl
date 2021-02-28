import { Injectable } from '@angular/core';
import { AslWord } from '../definitions/asl-words';
import { uniq } from './helpers';
import { SpellingQuizScore } from '../types/base.types';
import { Observable, Subject } from 'rxjs';
import { TrackingService } from './tracking.service';

@Injectable({ providedIn: 'root' })
export class UserSettingsService {
    reverseLayoutUpdated$: Observable<void>;

    private favoriteWordsCache: AslWord[] | null = null;
    private quizWordsCache: AslWord[] | null = null;
    private expandedCategoriesCache: string[] | null = null;

    private reverseLayoutUpdatedSubject = new Subject<void>();

    constructor(private trackingService: TrackingService) {
        this.reverseLayoutUpdated$ = this.reverseLayoutUpdatedSubject.asObservable();
    }

    getSpellQuizSpeed() {
        return 1.5;
    }

    setSpellingQuizScore(score: SpellingQuizScore) {
        window.localStorage.setItem('vrasl_spelling_score', JSON.stringify(score));
    }

    getSpellingQuizScore(): SpellingQuizScore {
        return (
            JSON.parse(window.localStorage.getItem('vrasl_spelling_score') ?? 'false') || {
                perfect: 0,
                wrong: 0,
                fine: 0,
            }
        );
    }

    setReverseLayout(enabled: boolean) {
        window.localStorage.setItem('vrasl_reverse_layout', String(enabled));
        this.reverseLayoutUpdatedSubject.next();
        this.trackingService.track('setting-change', { setting: 'reverse-layout', value: enabled });
    }

    getReverseLayout() {
        const enabled = window.localStorage.getItem('vrasl_reverse_layout');
        return enabled === 'true';
    }

    setSpeed(speed: number) {
        window.localStorage.setItem('vrasl_speed', String(speed));
    }

    getSpeed() {
        const speed = window.localStorage.getItem('vrasl_speed') ?? 1;
        const speedAsNumber = Number(speed);

        return isNaN(speedAsNumber) ? 1 : speedAsNumber;
    }

    setArrowsToggle(enabled: boolean) {
        window.localStorage.setItem('vrasl_arrows_toggle', String(enabled));
    }

    getArrowsToggle() {
        const enabled = window.localStorage.getItem('vrasl_arrows_toggle');
        return enabled === 'true';
    }

    setExpandedCategories(categories: string[]) {
        this.expandedCategoriesCache = categories;
        window.localStorage.setItem('vrasl_expanded_categories', JSON.stringify(categories));
    }

    setExpandedCategory(category: string, value: boolean | null) {
        if (value == null) {
            value = !this.getExpandedCategories().includes(category);
        }

        const newCategories = value
            ? [category, ...this.getExpandedCategories()]
            : this.getExpandedCategories().filter(w => w !== category);
        this.setExpandedCategories(uniq(newCategories));
    }

    getExpandedCategories() {
        if (!this.expandedCategoriesCache) {
            const words = window.localStorage.getItem('vrasl_expanded_categories') ?? '[]';
            try {
                this.expandedCategoriesCache = JSON.parse(words);
            } catch (e) {
                this.expandedCategoriesCache = [];
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.expandedCategoriesCache!;
    }

    setFavorites(words: AslWord[]) {
        this.favoriteWordsCache = words;
        window.localStorage.setItem('vrasl_favorites_words', JSON.stringify(words));
    }

    setFavoriteWord(word: AslWord, value: boolean | null) {
        if (value == null) {
            value = !this.getFavorites().includes(word);
        }

        const newFavorites = value ? [word, ...this.getFavorites()] : this.getFavorites().filter(w => w !== word);
        this.setFavorites(uniq(newFavorites));
    }

    getFavorites() {
        if (!this.favoriteWordsCache) {
            const words = window.localStorage.getItem('vrasl_favorites_words') ?? '[]';
            try {
                this.favoriteWordsCache = JSON.parse(words);
            } catch (e) {
                this.favoriteWordsCache = [];
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.favoriteWordsCache!;
    }

    setQuizWords(words: AslWord[]) {
        this.quizWordsCache = words;
        window.localStorage.setItem('vrasl_quiz_words', JSON.stringify(words));
    }

    setQuizWord(word: AslWord, value: boolean | null) {
        if (value == null) {
            value = !this.getQuizWords().includes(word);
        }

        const newQuizWords = value ? [word, ...this.getQuizWords()] : this.getQuizWords().filter(w => w !== word);
        this.setQuizWords(uniq(newQuizWords));
    }

    getQuizWords() {
        if (!this.quizWordsCache) {
            const words = window.localStorage.getItem('vrasl_quiz_words') ?? '[]';
            try {
                this.quizWordsCache = JSON.parse(words);
            } catch (e) {
                this.quizWordsCache = [];
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.quizWordsCache!;
    }

    setShowOnlyFavorites(show: boolean) {
        window.localStorage.setItem('vrasl_show_favorites', String(show));
    }

    getShowOnlyFavorites() {
        const enabled = window.localStorage.getItem('vrasl_show_favorites');
        return enabled === 'true';
    }

    setShowCategories(show: boolean) {
        window.localStorage.setItem('vrasl_show_categories', String(show));
    }

    getShowCategories() {
        const enabled = window.localStorage.getItem('vrasl_show_categories') ?? 'true';
        return enabled === 'true';
    }

    setLastFilter(filter: string) {
        window.localStorage.setItem('vrasl_last_filter', filter);
    }

    getLastFilter() {
        return window.localStorage.getItem('vrasl_last_filter') ?? '';
    }
}
