import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AslWord } from '../../definitions/asl-words';
import { UserSettingsService } from '../../services/user-settings.service';
import { AslWordsDefinitions } from '../../definitions/asl-words-definitions';
import { WordDefinition } from '../../types/base.types';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'a-asl-word-button',
    templateUrl: './asl-word-button.component.html',
    styleUrls: ['./asl-word-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class AslWordButtonComponent implements OnInit {
    @Input() word?: AslWord;

    @Output() wordClicked = new EventEmitter<void>();

    get definition() {
        if (!this.word) {
            return {} as WordDefinition;
        }

        return AslWordsDefinitions[this.word];
    }

    constructor(private userSettingsService: UserSettingsService, private snotifyService: SnotifyService) {}

    ngOnInit() {}

    isWordFavorited() {
        if (!this.word) {
            return false;
        }

        return this.userSettingsService.getFavorites().includes(this.word);
    }

    isWordQuizzed() {
        if (!this.word) {
            return false;
        }

        return this.userSettingsService.getQuizWords().includes(this.word);
    }

    onWordClicked() {
        this.wordClicked.emit();
    }

    onWordFavorited() {
        if (!this.word) {
            return;
        }

        this.userSettingsService.setFavoriteWord(this.word, null);
    }

    onWordQuizzed() {
        if (!this.word) {
            return;
        }

        this.userSettingsService.setQuizWord(this.word, null);
    }

    onShareClick() {
        if (!this.word) {
            return;
        }

        navigator.clipboard.writeText(`${location.origin}/#/dictionary/word/${this.word}`).then(
            () => {
                this.snotifyService.success('Link copied to clipboard');
            },
            () => {
                this.snotifyService.error('Failed to copy link to clipboard');
            },
        );
    }
}
