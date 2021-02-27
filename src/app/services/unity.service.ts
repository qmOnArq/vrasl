import { Injectable } from '@angular/core';
import { UnityInstance } from '../types/base.types';
import { UserSettingsService } from './user-settings.service';

@Injectable({ providedIn: 'root' })
export class UnityService {
    private readonly gameObjectName = 'Communicator';

    private unity?: UnityInstance;
    private paused = false;

    constructor(private userSettingsService: UserSettingsService) {}

    initialize(unity: UnityInstance) {
        this.unity = unity;
        this.paused = false;

        this.setSpeed(this.userSettingsService.getSpeed());
        this.toggleArrows(this.userSettingsService.getArrowsToggle());
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

    selectClip(name: string) {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'SelectClip', name);
    }
}
