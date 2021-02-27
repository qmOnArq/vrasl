import { Injectable } from '@angular/core';
import { AslWord } from '../definitions/asl-words';

@Injectable({ providedIn: 'root' })
export class UserSettingsService {
    private favoriteWordsCache: AslWord[] | null = null;
    private quizWordsCache: AslWord[] | null = null;

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

    setFavorites(words: AslWord[]) {
        window.localStorage.setItem('vrasl_favorites_words', JSON.stringify(words));
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

        return this.favoriteWordsCache;
    }

    setQuizWords(words: AslWord[]) {
        window.localStorage.setItem('vrasl_quiz_words', JSON.stringify(words));
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

        return this.quizWordsCache;
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
