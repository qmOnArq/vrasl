import { Injectable, NgZone } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * When using Safari, it is possible that the browser will freeze when using ResizeObserver, the solution is to
 * run the observation part outside `NgZone`.
 *
 * https://github.com/que-etc/resize-observer-polyfill/issues/36#issuecomment-402638900
 */
@Injectable({ providedIn: 'root' })
export class ResizeObserverFactoryService {
    constructor(private ngZone: NgZone) {}

    new(callback: ResizeObserverCallback): ResizeObserver {
        const patchedCallback: ResizeObserverCallback = (...args) => {
            this.ngZone.run(() => {
                callback(...args);
            });
        };

        const originalResizeObserver = new ResizeObserver(patchedCallback);
        const self = this;
        return {
            observe: (...args) => self.ngZone.runOutsideAngular(() => originalResizeObserver.observe(...args)),
            unobserve: (...args) => self.ngZone.runOutsideAngular(() => originalResizeObserver.unobserve(...args)),
            disconnect: (...args) => originalResizeObserver.disconnect(...args),
        };
    }
}
