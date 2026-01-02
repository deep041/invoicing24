import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InputComponent } from "../../widgets/input/input.component";
import { ButtonComponent } from "../../widgets/button/button.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-create-item',
    imports: [MatDialogContent, InputComponent, MatDialogActions, ButtonComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './create-item.component.html',
    styleUrl: './create-item.component.scss'
})

export class CreateItemComponent implements OnInit {

    itemForm!: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateItemComponent>, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
        this.createForm();

        if (this.data?._id) {
            this.itemForm.patchValue({
                id: this.data._id,
                name: this.data.name,
                price: this.data.price
            });
        }
    }

    createForm() {
        this.itemForm = this.fb.group({
            id: '',
            name: ['', [Validators.required]],
            price: ['', [Validators.required]],
            hsnCode: ['']
        });
    }

    create() {
        if (this.itemForm.valid) {
            if (this.data?._id) {
                this.apiService.editItem(this.itemForm.value).subscribe((res: any) => {
                    if (res && res.success) {
                        this.close(true);
                    }
                })
            } else {
                this.apiService.createItem(this.itemForm.value).subscribe((res: any) => {
                    if (res && res.success) {
                        this.close(true);
                    }
                })
            }
        }
    }

    close(res: boolean = false) {
        this.dialogRef.close(res);
    }

}
