import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserSettingsService {
    setSpeed(speed: number) {
        window.localStorage.setItem('vrasl_speed', String(speed));
    }

    getSpeed() {
        const speed = window.localStorage.getItem('vrasl_speed') ?? 1;
        const speedAsNumber = Number(speed);

        return isNaN(speedAsNumber) ? 1 : speedAsNumber;
    }

    setArrowsToggle(enabled: boolean) {
        window.localStorage.setItem('vrasl_arrows_toggle', String(enabled));
    }

    getArrowsToggle() {
        const enabled = window.localStorage.getItem('vrasl_arrows_toggle');
        return enabled === 'true';
    }
}
