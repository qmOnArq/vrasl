import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GlobalStateService } from '../../services/global-state.service';

@Component({
    selector: 'a-empty-page',
    templateUrl: './empty-page.component.html',
    styleUrls: ['./empty-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class EmptyPageComponent implements OnInit {
    constructor(private globalStateService: GlobalStateService) {}

    ngOnInit(): void {
        this.globalStateService.setQuizMode(false);
    }
}
