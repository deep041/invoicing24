import { Component, OnInit } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogRef } from "@angular/material/dialog";
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

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateItemComponent>, private apiService: ApiService) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.itemForm = this.fb.group({
            name: ['', [Validators.required]],
            price: ['', [Validators.required]]
        });
    }

    create() {
        if (this.itemForm.valid) {
            this.apiService.createItem(this.itemForm.value).subscribe((res: any) => {
                if (res && res.success) {
                    this.close(true);
                }
            })
        }
    }

    close(res: boolean = false) {
        this.dialogRef.close(res);
    }

}
