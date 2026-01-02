import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input',
    imports: [FormsModule, CommonModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})

export class InputComponent implements ControlValueAccessor {

    @Input() label: string = '';
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() min: number | null = 0;
    @Input() max: number | null = 0;

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

    checkValidation(event: Event) {
        if ((this.type === 'number') && this.max && (this.value > this.max)) {
            this.value = this.max;
            let input =  event.target as HTMLInputElement;

            input.value = this.value;
            this.handleInput();
        }
    }
}
