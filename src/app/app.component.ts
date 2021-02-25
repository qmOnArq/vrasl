import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UnityService } from './services/unity.service';
import { UnityInstance } from './types/base.types';

@Component({
    selector: 'a-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class AppComponent implements OnInit {
    @ViewChild('iframe') private iframe?: ElementRef<HTMLIFrameElement>;

    loading$ = new BehaviorSubject(true);

    constructor(private unityService: UnityService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        (window as any).onUnityLoad = (unity: UnityInstance) => {
            this.unityService.initialize(unity);
            this.unityLoaded();
        };

        (window as any).onUnityLoadProgress = (progress: number) => {
            this.unityLoadProgress(progress);
        };
    }

    private unityLoaded() {
        this.loading$.next(false);
        this.cd.detectChanges();
    }

    private unityLoadProgress(progress: number) {}
}
