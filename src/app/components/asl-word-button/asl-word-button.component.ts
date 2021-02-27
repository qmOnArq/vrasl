import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AslWord } from '../../definitions/asl-words';

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
    @Output() wordFavorited = new EventEmitter<void>();
    @Output() wordQuizzed = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}

    onWordClicked() {
        this.wordClicked.emit();
    }

    onWordFavorited() {
        this.wordFavorited.emit();
    }

    onWordQuizzed() {
        this.wordQuizzed.emit();
    }
}
