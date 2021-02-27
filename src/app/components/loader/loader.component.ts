import { Component, Input } from '@angular/core';

@Component({
    selector: 'a-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
    @Input() background = 'white';
}
