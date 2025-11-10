import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../widgets/input/input.component";
import { MatDialogActions, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { ButtonComponent } from "../../widgets/button/button.component";
import { TextareaComponent } from "../../widgets/textarea/textarea.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-create-customer',
    imports: [InputComponent, MatDialogActions, ButtonComponent, MatDialogContent, TextareaComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './create-customer.component.html',
    styleUrl: './create-customer.component.scss'
})

export class CreateCustomerComponent implements OnInit {

    customerForm!: FormGroup;

    constructor(private fb: FormBuilder, private apiService: ApiService, private dialogRef: MatDialogRef<CreateCustomerComponent>) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.customerForm = this.fb.group({
            name: ['', [Validators.required]],
            contactNo: ['', [Validators.required]],
            address: ['', [Validators.required]]
        });
    }

    create() {
        if (this.customerForm.valid) {
            this.apiService.createCustomer(this.customerForm.value).subscribe((data: any) => {
                if (data.success) {
                    this.close(true);
                }
            })
        }
    }

    close(res: boolean = false) {
        this.dialogRef.close(res);
    }
}
