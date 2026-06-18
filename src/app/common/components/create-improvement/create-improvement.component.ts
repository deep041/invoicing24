import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../widgets/button/button.component';
import { InputComponent } from '../../widgets/input/input.component';
import { TextareaComponent } from '../../widgets/textarea/textarea.component';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-create-improvement',
    imports: [ReactiveFormsModule, MatDialogContent, MatDialogActions, MatIconModule, ButtonComponent, InputComponent, TextareaComponent],
    templateUrl: './create-improvement.component.html',
    styleUrl: './create-improvement.component.scss'
})
export class CreateImprovementComponent implements OnInit {

    improvementForm!: FormGroup;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private toastService: ToastService,
        private dialogRef: MatDialogRef<CreateImprovementComponent>,
        @Inject(MAT_DIALOG_DATA) public data: unknown
    ) {}

    ngOnInit(): void {
        this.improvementForm = this.fb.group({
            title: ['', Validators.required],
            description: ['']
        });
    }

    create(): void {
        if (!this.improvementForm.valid || this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;
        this.apiService.createImprovement(this.improvementForm.value).subscribe((response) => {
            this.isSubmitting = false;
            if (response?.success) {
                this.toastService.show({ message: 'Improvement created successfully', type: 'success' });
                this.close(true);
            }
        });
    }

    close(saved = false): void {
        this.dialogRef.close(saved);
    }
}
