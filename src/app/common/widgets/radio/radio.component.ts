import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-radio',
    imports: [FormsModule],
    templateUrl: './radio.component.html',
    styleUrl: './radio.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioComponent),
            multi: true
        }
    ]
})

export class RadioComponent implements ControlValueAccessor {

    @Input() label: string = '';
    @Input() disabled: boolean = false;
    @Input() options: any[] = [];
    @Input() name: string = 'default';

    value: any = '';

    onChange = (_: any) => { };
    onTouched = () => { };

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleInput() {
        this.onChange(this.value);
        this.onTouched();
    }
}
