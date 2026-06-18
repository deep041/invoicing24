import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../widgets/button/button.component';
import { TextareaComponent } from '../../widgets/textarea/textarea.component';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { Improvement, ImprovementComment } from '../../interfaces/improvement.interface';

@Component({
    selector: 'app-improvement-comments',
    imports: [
        CommonModule,
        FormsModule,
        MatDialogContent,
        MatDialogActions,
        MatIconModule,
        ButtonComponent,
        TextareaComponent
    ],
    templateUrl: './improvement-comments.component.html',
    styleUrl: './improvement-comments.component.scss'
})
export class ImprovementCommentsComponent implements OnInit {

    comments: ImprovementComment[] = [];
    newComment = '';
    isSubmitting = false;
    isLoading = true;
    hasNewComments = false;

    constructor(
        private apiService: ApiService,
        private toastService: ToastService,
        private dialogRef: MatDialogRef<ImprovementCommentsComponent>,
        @Inject(MAT_DIALOG_DATA) public improvement: Improvement
    ) {}

    ngOnInit(): void {
        this.loadComments();
    }

    loadComments(): void {
        this.isLoading = true;
        this.apiService.getImprovementComments(this.improvement._id).subscribe((response) => {
            this.isLoading = false;
            if (response?.success) {
                this.comments = response.data;
            }
        });
    }

    submitComment(): void {
        const text = this.newComment.trim();
        if (!text || this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;
        this.apiService.addImprovementComment(this.improvement._id, { text }).subscribe((response) => {
            this.isSubmitting = false;
            if (response?.success) {
                this.newComment = '';
                this.hasNewComments = true;
                this.loadComments();
                this.toastService.show({ message: 'Comment added successfully', type: 'success' });
            }
        });
    }

    close(): void {
        this.dialogRef.close(this.hasNewComments);
    }

    getStatusClass(status: string): string {
        return `status-${status}`;
    }

    getStatusLabel(status: string): string {
        return status.replace('_', ' ');
    }

    getAuthorInitial(comment: ImprovementComment): string {
        const name = comment.userName?.trim();
        return name ? name[0].toUpperCase() : 'U';
    }
}
