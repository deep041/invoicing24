import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})

export class ButtonComponent {

    @Input() title: string = '';
    @Input() style: string = 'style1';
    @Input() disabled: boolean = false;
}
