import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'a-empty-page',
    templateUrl: './empty-page.component.html',
    styleUrls: ['./empty-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class EmptyPageComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
