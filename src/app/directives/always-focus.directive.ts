import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({ selector: 'input[aAlwaysFocus]' })
export class AlwaysFocusDirective implements OnInit {
    @Input() aAlwaysFocus = true;

    constructor(private element: ElementRef<HTMLInputElement>) {}

    ngOnInit() {
        if (this.aAlwaysFocus) {
            this.focus();
        }
    }

    @HostListener('blur')
    private onBlur() {
        if (this.aAlwaysFocus) {
            this.focus();
        }
    }

    private focus() {
        if (this.element?.nativeElement) {
            this.element.nativeElement.focus();
        }
    }
}
