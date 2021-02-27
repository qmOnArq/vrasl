import { Component, Input } from '@angular/core';

@Component({
    selector: 'a-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    preserveWhitespaces: false,
})
export class LoaderComponent {
    @Input() background = 'white';
}
