import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { EnglishWords } from '../../definitions/english-words';
import { AslWord } from '../../definitions/asl-words';
import { AslWordsLetters } from '../../definitions/asl-words-letters';
import { UnityService } from '../../services/unity.service';
import { AslWordsDurations } from '../../definitions/asl-words-durations';
import { GlobalStateService } from '../../services/global-state.service';
import { SpellingQuizScore } from '../../types/base.types';
import { UserSettingsService } from '../../services/user-settings.service';
import { TrackingService } from '../../services/tracking.service';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';

@Component({
    selector: 'a-spelling-quiz-page',
    templateUrl: './spelling-quiz-page.component.html',
    styleUrls: ['./spelling-quiz-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class SpellingQuizPageComponent implements OnInit, OnDestroy {
    @ViewChild('input', { static: false }) private input?: ElementRef<HTMLInputElement>;

    currentWord = '';
    clipIndex = 0;
    clips: AslWord[] = [];
    tries = 0;

    sessionScore: SpellingQuizScore = {
        fine: 0,
        perfect: 0,
        wrong: 0,
    };

    lifetimeScore: SpellingQuizScore = this.userSettingsService.getSpellingQuizScore();

    yourGuess = '';

    waitingForWord = false;

    private timeout: number | null = null;
    private nextWordTimeout: number | null = null;
    private englishWords = EnglishWords.filter(word => word.length > 2);

    constructor(
        private unityService: UnityService,
        private globalStateService: GlobalStateService,
        private userSettingsService: UserSettingsService,
        private trackingService: TrackingService,
        private snotifyService: SnotifyService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.globalStateService.setQuizMode(true);
        this.unityService.loaded().then(() => {
            this.unityService.stop(false);
        });
    }

    ngOnDestroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.nextWordTimeout) {
            clearTimeout(this.nextWordTimeout);
            this.nextWordTimeout = null;
        }
    }

    submitAnswer() {
        const yourGuess = this.yourGuess.toLowerCase().trim();
        this.yourGuess = '';
        if (!yourGuess) {
            return;
        }

        if (yourGuess === this.currentWord.toLowerCase().trim()) {
            if (this.tries === 3) {
                this.lifetimeScore.perfect++;
                this.sessionScore.perfect++;
                this.userSettingsService.setSpellingQuizScore(this.lifetimeScore);
                this.trackingService.track('spelling-quiz-submit', {
                    word: this.currentWord,
                    score: 'perfect',
                    speed: this.userSettingsService.getQuizSpeed(),
                });

                this.snotifyService.success('', 'Perfect!', {
                    position: SnotifyPosition.centerTop,
                    timeout: 2000,
                });

                this.waitingForWord = true;
                setTimeout(() => {
                    this.waitingForWord = false;
                    this.getRandomWord();
                    this.cd.markForCheck();
                }, 2500);
            } else {
                this.lifetimeScore.fine++;
                this.sessionScore.fine++;
                this.userSettingsService.setSpellingQuizScore(this.lifetimeScore);
                this.trackingService.track('spelling-quiz-submit', {
                    word: this.currentWord,
                    score: 'fine',
                    speed: this.userSettingsService.getQuizSpeed(),
                });

                this.snotifyService.warning('', 'Fine!', {
                    position: SnotifyPosition.centerTop,
                    timeout: 2000,
                });

                this.waitingForWord = true;
                setTimeout(() => {
                    this.waitingForWord = false;
                    this.getRandomWord();
                    this.cd.markForCheck();
                }, 2500);
            }
        } else {
            this.tries--;
            if (this.tries === 0) {
                this.lifetimeScore.wrong++;
                this.sessionScore.wrong++;
                this.userSettingsService.setSpellingQuizScore(this.lifetimeScore);
                this.trackingService.track('spelling-quiz-submit', {
                    word: this.currentWord,
                    score: 'wrong',
                    speed: this.userSettingsService.getQuizSpeed(),
                });
            } else {
                this.snotifyService.error(`${this.tries} ${this.tries !== 1 ? 'tries' : 'try'} left`, 'Wrong!', {
                    position: SnotifyPosition.centerTop,
                    timeout: 2000,
                });
            }
        }
    }

    restartWord() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.clipIndex = 0;
        this.playNextClip();
        this.trackingService.track('spelling-quiz-restart-word', { word: this.currentWord });
    }

    getRandomWord() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        let word = '';
        do {
            word = this.englishWords[Math.floor(Math.random() * this.englishWords.length)].toLowerCase();
        } while (this.currentWord === word && this.currentWord[this.clipIndex] === word[0]);

        this.currentWord = word;
        this.clipIndex = 0;
        this.clips = this.currentWord
            .split('')
            .map(letter => {
                const clips = AslWordsLetters[letter];
                if (clips) {
                    return clips[Math.floor(Math.random() * clips.length)];
                } else {
                    return (false as unknown) as AslWord;
                }
            })
            .filter(clip => !!clip);

        this.tries = 3;
        this.yourGuess = '';
        this.playNextClip();

        setTimeout(() => {
            this.focusInput();
        }, 0);
    }

    private playNextClip() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.unityService.loaded().then(() => {
            this.unityService.setSpeed(this.userSettingsService.getQuizSpeed(), false);

            if (this.clipIndex === this.clips.length) {
                this.unityService.stop(false);
                return;
            }

            const currentClip = this.clips[this.clipIndex];
            this.unityService.selectClip(currentClip, false);
            this.unityService.play(false);
            this.clipIndex++;
            if (this.clipIndex <= this.clips.length) {
                this.timeout = setTimeout(() => {
                    this.playNextClip();
                }, (AslWordsDurations[currentClip] * 1000) / this.userSettingsService.getQuizSpeed());
            }
        });
    }

    private focusInput() {
        if (this.input?.nativeElement) {
            this.input.nativeElement.focus();
        }
    }
}
