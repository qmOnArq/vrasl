import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'a-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
    navigationItems = [
        {
            name: 'Dictionary',
            path: 'dictionary',
        },
        {
            name: 'Spelling Quiz ',
            path: 'spelling-quiz',
        },
        {
            name: 'Word Quiz',
            path: 'word-quiz',
        },
        {
            name: 'Settings',
            path: 'settings',
        },
    ];

    constructor() {}

    ngOnInit() {}
}
