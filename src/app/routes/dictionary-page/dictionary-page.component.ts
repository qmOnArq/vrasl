import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AslWords } from '../../definitions/asl-words';
import { UnityService } from '../../services/unity.service';

@Component({
    selector: 'a-dictionary-page',
    templateUrl: './dictionary-page.component.html',
    styleUrls: ['./dictionary-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class DictionaryPageComponent implements OnInit {
    words = AslWords;

    constructor(private unityService: UnityService) {}

    ngOnInit(): void {}

    click(word: string) {
        this.unityService.selectClip(word);
    }
}
