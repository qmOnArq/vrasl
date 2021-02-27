import { Injectable } from '@angular/core';
import { UnityInstance } from '../types/base.types';
import { UserSettingsService } from './user-settings.service';
import { BehaviorSubject } from 'rxjs';
import { AslWord } from '../definitions/asl-words';
import { Deferred } from './deferred';

@Injectable({ providedIn: 'root' })
export class UnityService {
    private readonly gameObjectName = 'Communicator';
    private readonly loadedPromise = new Deferred<void>();

    private unity?: UnityInstance;
    private paused = false;
    private currentWord$ = new BehaviorSubject<AslWord | null>(null);

    constructor(private userSettingsService: UserSettingsService) {}

    initialize(unity: UnityInstance) {
        this.unity = unity;
        this.paused = false;

        this.setSpeed(this.userSettingsService.getSpeed());
        this.toggleArrows(this.userSettingsService.getArrowsToggle());
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
    }

    stop() {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.currentWord$.next(null);
        this.unity.SendMessage(this.gameObjectName, 'Stop');
    }

    play() {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'Play');
        this.paused = false;
    }

    pause() {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'Pause');
        this.paused = true;
    }

    setSpeed(speed: number) {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'SetSpeed', speed);
    }

    toggleArrows(visible: boolean) {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'ToggleArrows', String(visible));
    }

    selectClip(name: AslWord) {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.currentWord$.next(name);
        this.unity.SendMessage(this.gameObjectName, 'SelectClip', name);
    }

    getCurrentWord$() {
        return this.currentWord$;
    }
}
