import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';

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
            path: '/dictionary',
        },
        {
            name: 'Spelling Quiz ',
            path: '/spelling-quiz',
        },
        {
            name: 'Word Quiz',
            path: '/word-quiz',
        },
        {
            name: 'Settings',
            path: '/settings',
        },
    ];

    constructor(private userSettingsService: UserSettingsService) {}

    ngOnInit() {}

    isPathActive(path: string) {
        let currentPath = location.hash;
        if (currentPath.startsWith('#')) {
            currentPath = currentPath.substr(1, currentPath.length);
        }
        if (!currentPath.startsWith('/')) {
            currentPath = `/${currentPath}`;
        }
        if (currentPath === '/' && path === '/dictionary') {
            return true;
        }
        return currentPath.startsWith(path);
    }

    switchTheme() {
        this.userSettingsService.setTheme(this.userSettingsService.getTheme() === 'light' ? 'dark' : 'light');
    }

    getTheme() {
        return this.userSettingsService.getTheme();
    }
}
