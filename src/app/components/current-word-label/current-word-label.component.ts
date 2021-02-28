import { Component, OnInit } from '@angular/core';
import { UnityService } from '../../services/unity.service';
import { GlobalStateService } from '../../services/global-state.service';

@Component({
    selector: 'a-current-word-label',
    templateUrl: './current-word-label.component.html',
    styleUrls: ['./current-word-label.component.scss'],
    preserveWhitespaces: false,
})
export class CurrentWordLabelComponent implements OnInit {
    currentWord$ = this.unityService.getCurrentWord$();

    constructor(private unityService: UnityService, private globalStateService: GlobalStateService) {}

    ngOnInit() {}

    isQuizMode() {
        return this.globalStateService.getQuizMode();
    }
}
