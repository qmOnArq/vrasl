import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrackingService {
    initialize() {
        if (location.origin.includes('localhost')) {
            return;
        }
        (window as any).exponea.start();
    }

    track(event: string, data: unknown) {
        if (location.origin.includes('localhost')) {
            return;
        }
        (window as any).exponea.track(event, data);
    }
}
