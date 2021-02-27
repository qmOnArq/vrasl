import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UnityService } from '../../services/unity.service';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
    selector: 'a-player-controls',
    templateUrl: './player-controls.component.html',
    styleUrls: ['./player-controls.component.scss'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerControlsComponent implements OnInit {
    arrowsVisible = this.userSettingsService.getArrowsToggle();
    speed = this.userSettingsService.getSpeed();

    constructor(private unityService: UnityService, private userSettingsService: UserSettingsService) {}

    ngOnInit() {}

    isPaused() {
        return this.unityService.isPaused();
    }

    pause() {
        this.unityService.pause();
    }

    play() {
        this.unityService.play();
    }

    setSpeed(value: number) {
        this.speed = value;
        this.unityService.setSpeed(value);
        this.userSettingsService.setSpeed(value);
    }

    toggleArrows() {
        this.arrowsVisible = !this.arrowsVisible;
        this.unityService.toggleArrows(this.arrowsVisible);
        this.userSettingsService.setArrowsToggle(this.arrowsVisible);
    }

    resetCamera() {
        this.unityService.resetCamera();
    }
}
