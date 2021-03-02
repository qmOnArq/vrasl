import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AslWordsCategories } from '../../definitions/asl-words-categories';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { AslWord } from '../../definitions/asl-words';
import { UserSettingsService } from '../../services/user-settings.service';
import { getRandom, shuffle, uniq } from '../../services/helpers';
import { AslWordsDefinitions } from '../../definitions/asl-words-definitions';
import { GlobalStateService } from '../../services/global-state.service';
import { UnityService } from '../../services/unity.service';
import { Deferred } from '../../services/deferred';

@Component({
    selector: 'a-word-quiz-page',
    templateUrl: './word-quiz-page.component.html',
    styleUrls: ['./word-quiz-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class WordQuizPageComponent implements OnInit {
    allCategories = AslWordsCategories;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    QuizStateEnum = QuizState;

    favoritesEnabled = false;
    quizWordsEnabled = false;
    categoriesEnabled: string[] = [];

    allQuizWords: AslWord[] = [];
    remainingQuizWords: AslWord[] = [];

    state: QuizState = QuizState.categorySelect;

    currentWord: AslWord | null = null;
    buttons: AslWord[] = [];

    correctWords = 0;
    wrongWords = 0;
    wrongPicks: { your: AslWord; real: AslWord }[] = [];

    selectedWord: AslWord | null = null;

    constructor(
        private snotifyService: SnotifyService,
        public userSettingsService: UserSettingsService,
        private globalStateService: GlobalStateService,
        private unityService: UnityService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.globalStateService.setQuizMode(true);
        this.unityService.loaded().then(() => {
            this.unityService.stop(false);
        });
    }

    toggleQuizWords() {
        this.quizWordsEnabled = !this.quizWordsEnabled;
        this.updateWordList();
    }

    toggleFavorites() {
        this.favoritesEnabled = !this.favoritesEnabled;
        this.updateWordList();
    }

    toggleCategory(name: string) {
        const enabled = this.categoriesEnabled.includes(name);
        if (enabled) {
            this.categoriesEnabled = this.categoriesEnabled.filter(item => item !== name);
        } else {
            this.categoriesEnabled = [name, ...this.categoriesEnabled];
        }

        this.updateWordList();
    }

    updateWordList() {
        this.allQuizWords = [
            ...(this.favoritesEnabled ? this.userSettingsService.getFavorites() : []),
            ...(this.quizWordsEnabled ? this.userSettingsService.getQuizWords() : []),
        ];
        this.categoriesEnabled.forEach(categoryName => {
            const category = AslWordsCategories.find(cat => cat.name === categoryName);
            if (category) {
                this.allQuizWords = [...this.allQuizWords, ...category.words];
            }
        });
        this.allQuizWords = uniq(this.allQuizWords);
        this.allQuizWords = this.allQuizWords.filter(word => !AslWordsDefinitions[word].hidden);
        this.remainingQuizWords = [...this.allQuizWords];
    }

    startQuiz() {
        if (!this.quizWordsEnabled && !this.favoritesEnabled && this.categoriesEnabled.length === 0) {
            this.snotifyService.error('Select at least 1 category', 'No categories', {
                position: SnotifyPosition.centerTop,
            });
            return;
        }

        this.updateWordList();
        if (this.allQuizWords.length < 4) {
            this.snotifyService.error('Not enough words. Quiz needs at least 4 words.', '', {
                position: SnotifyPosition.centerTop,
            });
            return;
        }

        this.state = QuizState.started;
        this.selectedWord = null;
        this.correctWords = 0;
        this.wrongWords = 0;
        this.wrongPicks = [];
        this.prepareNextWord();
    }

    prepareNextWord() {
        if (this.remainingQuizWords.length === 0) {
            this.endQuiz(false);
        }

        this.selectedWord = null;
        this.currentWord = getRandom(this.remainingQuizWords, 1)[0];
        const otherWords = this.allQuizWords.filter(w => w !== this.currentWord);
        const wrongWords = getRandom(otherWords, 3);
        this.buttons = shuffle([this.currentWord, ...wrongWords]);
        this.remainingQuizWords = this.remainingQuizWords.filter(word => word !== this.currentWord);

        this.unityService.loaded().then(() => {
            if (!this.currentWord) {
                return;
            }

            this.unityService.setSpeed(this.userSettingsService.getQuizSpeed(), false);
            this.unityService.selectClip(this.currentWord, false);
            this.unityService.play(false);
        });
    }

    wordSelected(word: AslWord) {
        if (this.selectedWord || !this.currentWord) {
            return;
        }

        this.selectedWord = word;

        if (word === this.currentWord) {
            this.correctWords++;
        } else {
            this.wrongWords++;
            this.wrongPicks.push({
                your: word,
                real: this.currentWord,
            });
        }
    }

    endQuiz(withConfirm: boolean) {
        const end = () => {
            this.state = QuizState.end;
            this.globalStateService.setQuizMode(false);
        };

        if (withConfirm) {
            this.endConfirm('').then(() => {
                end();
                this.cd.markForCheck();
            });
        } else {
            end();
        }
    }

    restartQuiz() {
        this.globalStateService.setQuizMode(true);
        this.state = QuizState.categorySelect;
    }

    playWord(word: AslWord) {
        this.unityService.loaded().then(() => {
            this.unityService.selectClip(word);
        });
    }

    private endConfirm(text: string) {
        const deferred = new Deferred<void>();

        const toast = this.snotifyService.confirm(text, 'Are you sure?', {
            position: SnotifyPosition.centerCenter,
            type: 'error',
            backdrop: 0.8,
            buttons: [
                {
                    text: 'Yes',
                    action: () => {
                        deferred.resolve();
                        this.snotifyService.remove(toast.id);
                    },
                },
                {
                    text: 'No',
                    action: () => {
                        this.snotifyService.remove(toast.id);
                    },
                },
            ],
        });

        return deferred.promise;
    }
}

// eslint-disable-next-line no-shadow
enum QuizState {
    categorySelect,
    started,
    end,
}
