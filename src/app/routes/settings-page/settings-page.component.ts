import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { TrackingService } from '../../services/tracking.service';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { Deferred } from '../../services/deferred';

@Component({
    selector: 'a-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class SettingsPageComponent implements OnInit {
    reverseLayout = this.userSettingsService.getReverseLayout();

    constructor(
        private userSettingsService: UserSettingsService,
        private trackingService: TrackingService,
        private snotifyService: SnotifyService,
    ) {}

    ngOnInit(): void {}

    onReverseLayoutChange(enabled: boolean) {
        this.reverseLayout = enabled;
        this.userSettingsService.setReverseLayout(this.reverseLayout);
    }

    resetFavorites() {
        this.resetConfirm('Resetting favorites cannot be undone.').then(() => {
            this.userSettingsService.setFavorites([]);
        });
    }

    resetQuizWords() {
        this.resetConfirm('Resetting quiz words cannot be undone.').then(() => {
            this.userSettingsService.setQuizWords([]);
        });
    }

    resetSpellingScore() {
        this.resetConfirm('Resetting spelling score cannot be undone.').then(() => {
            this.userSettingsService.setSpellingQuizScore({
                fine: 0,
                wrong: 0,
                perfect: 0,
            });
        });
    }

    private resetConfirm(text: string) {
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
