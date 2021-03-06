import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnInit,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { toBoolean } from '../../services/helpers';

@Component({
    selector: 'a-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls: ['./collapsable.component.scss'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('collapse', [
            state('false', style({ height: '*' })),
            transition('false => true', [animate('.3s ease-in-out', style({ height: 0 }))]), // 0.3s = SASS variable $animation-quick
            state('true', style({ height: 0 })),
            transition('true => false', [animate('.3s ease-in-out', style({ height: '*' }))]), // 0.3s = SASS variable $animation-quick
        ]),
    ],
})
export class CollapsableComponent implements OnInit, OnChanges, OnDestroy {
    @Input() title = '';

    @HostBinding('class.collapsed')
    @Input()
    collapsed = false;
    @Output() collapsedChange = new EventEmitter<boolean>();

    // disabled
    //     true: disabled | disabled="true" | disabled="required" | disabled="any value" | [disabled]="true"
    //     false: no attribute | disabled="false" | [disabled]="false" | [disabled]
    @Input()
    public set disabled(val: any) {
        // eslint-disable-next-line no-underscore-dangle
        this._disabled = toBoolean(val);
    }
    public get disabled(): any {
        // eslint-disable-next-line no-underscore-dangle
        return this._disabled;
    }
    @HostBinding('class.disabled') private _disabled = false;

    contentVisible!: boolean;

    private timeout?: number | null;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.contentVisible = !this.collapsed;
    }

    ngOnDestroy() {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('collapsed' in changes) {
            this.collapsedChanged();
        }
    }

    toggleCollapsed(): void {
        if (!this.disabled) {
            this.collapsed = !this.collapsed;
            this.collapsedChanged();
            this.collapsedChange.emit(this.collapsed);
        }
    }

    private collapsedChanged() {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (!this.collapsed) {
            this.contentVisible = true;
        } else {
            this.timeout = setTimeout(() => {
                this.contentVisible = false;
                this.cd.markForCheck();
            }, 350);
        }
    }
}
