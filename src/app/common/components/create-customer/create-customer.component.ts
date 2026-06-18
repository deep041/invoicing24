import { Component, Inject, OnInit } from '@angular/core';
import { InputComponent } from "../../widgets/input/input.component";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { ButtonComponent } from "../../widgets/button/button.component";
import { TextareaComponent } from "../../widgets/textarea/textarea.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { SelectComponent } from '../../widgets/select/select.component';
import data from '../../../../assets/data.json';

@Component({
    selector: 'app-create-customer',
    imports: [InputComponent, MatDialogActions, ButtonComponent, MatDialogContent, TextareaComponent, FormsModule, ReactiveFormsModule, SelectComponent],
    templateUrl: './create-customer.component.html',
    styleUrl: './create-customer.component.scss'
})

export class CreateCustomerComponent implements OnInit {

    customerForm!: FormGroup;
    stateOptions = [
        { label: 'Select State', value: '' },
        ...data.states.map((state) => ({ label: state.name, value: state.code }))
    ];

    constructor(private fb: FormBuilder, private apiService: ApiService, private dialogRef: MatDialogRef<CreateCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
        this.createForm();

        if (this.data?._id) {
            this.customerForm.patchValue({
                id: this.data._id,
                name: this.data.name,
                contactNo: this.data.contactNo,
                address: this.data.address,
                stateCode: this.data.stateCode,
                gstNo: this.data.gstNo
            });
        }
    }

    createForm() {
        this.customerForm = this.fb.group({
            id: [''],
            name: ['', [Validators.required]],
            contactNo: ['', [Validators.required]],
            address: ['', [Validators.required]],
            stateCode: ['', Validators.required],
            gstNo: ['']
        });
    }

    create() {
        if (this.customerForm.valid) {
            if (this.data?._id) {
                this.apiService.editCustomer(this.customerForm.value).subscribe((data: any) => {
                    if (data.success) {
                        this.close(true);
                    }
                });
            } else {
                this.apiService.createCustomer(this.customerForm.value).subscribe((data: any) => {
                    if (data.success) {
                        this.close(true);
                    }
                });
            }
        }
    }

    close(res: boolean = false) {
        this.dialogRef.close(res);
    }
}
