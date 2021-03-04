import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'a-input-search',
    templateUrl: './input-search.component.html',
    styleUrls: ['./input-search.component.scss'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent implements OnInit {
    @Input() placeholder = 'Filter...';
    @Input() value = '';
    @Output() valueChange = new EventEmitter<string>();

    @Input() alwaysFocus = false;

    constructor() {}

    ngOnInit() {}

    onValueChange(newValue: string) {
        this.value = newValue;
        this.valueChange.emit(this.value);
    }

    onEscapePress() {
        this.value = '';
        this.valueChange.emit(this.value);
    }
}
