import { Injectable } from '@angular/core';
import { UnityInstance } from '../types/base.types';
import { UserSettingsService } from './user-settings.service';
import { BehaviorSubject } from 'rxjs';
import { AslWord } from '../definitions/asl-words';
import { Deferred } from './deferred';
import { TrackingService } from './tracking.service';

@Injectable({ providedIn: 'root' })
export class UnityService {
    private readonly gameObjectName = 'Communicator';
    private readonly loadedPromise = new Deferred<void>();

    private unity?: UnityInstance;
    private paused = false;
    private currentWord$ = new BehaviorSubject<AslWord | null>(null);

    constructor(private userSettingsService: UserSettingsService, private trackingService: TrackingService) {}

    initialize(unity: UnityInstance) {
        this.unity = unity;
        this.paused = false;

        this.setSpeed(this.userSettingsService.getSpeed(), false);
        this.toggleArrows(this.userSettingsService.getArrowsToggle(), false);
        this.loadedPromise.resolve();
    }

    loaded() {
        return this.loadedPromise.promise;
    }

    isPaused() {
        return this.paused;
    }

    resetCamera() {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'ResetCamera');
        this.trackingService.track('unity-action', { action: 'reset-camera' });
    }

    stop() {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.currentWord$.next(null);
        this.unity.SendMessage(this.gameObjectName, 'Stop');
        this.trackingService.track('unity-action', { action: 'stop' });
    }

    play() {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'Play');
        this.paused = false;
        this.trackingService.track('unity-action', { action: 'play' });
    }

    pause() {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'Pause');
        this.paused = true;
        this.trackingService.track('unity-action', { action: 'pause' });
    }

    setSpeed(speed: number, track = true) {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'SetSpeed', speed);
        if (track) {
            this.trackingService.track('unity-action', { action: 'set-speed', speed });
        }
    }

    toggleArrows(visible: boolean, track = true) {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'ToggleArrows', String(visible));
        if (track) {
            this.trackingService.track('unity-action', { action: 'toggle-arrows', visible });
        }
    }

    selectClip(name: AslWord) {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.currentWord$.next(name);
        this.unity.SendMessage(this.gameObjectName, 'SelectClip', name);
        this.trackingService.track('unity-action', { action: 'select-clip', clip: name });
    }

    getCurrentWord$() {
        return this.currentWord$;
    }
}
