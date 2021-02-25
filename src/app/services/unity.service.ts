import { Injectable } from '@angular/core';
import { UnityInstance } from '../types/base.types';

@Injectable({ providedIn: 'root' })
export class UnityService {
    private readonly gameObjectName = 'Communicator';

    private unity?: UnityInstance;

    initialize(unity: UnityInstance) {
        this.unity = unity;
    }

    resetCamera() {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'SelectClip');
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
    }

    pause() {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'Pause');
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

        this.unity.SendMessage(this.gameObjectName, 'ToggleArrows', visible);
    }

    selectClip(name: string) {
        if (!this.unity) {
            throw new Error('Unity not initialized');
        }

        this.unity.SendMessage(this.gameObjectName, 'SelectClip', name);
    }
}
