import { ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UnityService } from './services/unity.service';
import { UnityInstance } from './types/base.types';
import { UserSettingsService } from './services/user-settings.service';
import { TrackingService } from "./services/tracking.service";

@Component({
    selector: 'a-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    preserveWhitespaces: false,
})
export class AppComponent implements OnInit {
    @ViewChild('iframe') private iframe?: ElementRef<HTMLIFrameElement>;

    loading$ = new BehaviorSubject(true);

    @HostBinding('class.reverse')
    private reverse = this.userSettingsService.getReverseLayout();

    constructor(
        private unityService: UnityService,
        private cd: ChangeDetectorRef,
        private userSettingsService: UserSettingsService,
        private tracking: TrackingService,
    ) {}

    ngOnInit() {
        (window as any).onUnityLoad = (unity: UnityInstance) => {
            this.unityService.initialize(unity);
            this.unityLoaded();
        };

        (window as any).onUnityLoadProgress = (progress: number) => {
            this.unityLoadProgress(progress);
        };

        this.userSettingsService.reverseLayoutUpdated$.subscribe(() => {
            this.reverse = this.userSettingsService.getReverseLayout();
        });

        this.tracking.initialize();
    }

    private unityLoaded() {
        this.loading$.next(false);
        this.cd.detectChanges();
    }

    private unityLoadProgress(progress: number) {}
}
