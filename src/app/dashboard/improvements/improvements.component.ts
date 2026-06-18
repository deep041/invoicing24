import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../common/widgets/button/button.component';
import { ApiService } from '../../common/services/api.service';
import { Improvement } from '../../common/interfaces/improvement.interface';
import { ImprovementCommentsComponent } from '../../common/components/improvement-comments/improvement-comments.component';
import { CreateImprovementComponent } from '../../common/components/create-improvement/create-improvement.component';

@Component({
    selector: 'app-improvements',
    imports: [CommonModule, MatIconModule, ButtonComponent],
    templateUrl: './improvements.component.html',
    styleUrl: './improvements.component.scss'
})
export class ImprovementsComponent implements OnInit {

    improvements: Improvement[] = [];

    constructor(private apiService: ApiService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.loadImprovements();
    }

    loadImprovements(): void {
        this.apiService.getImprovements().subscribe((response) => {
            if (response?.success) {
                this.improvements = response.data;
            }
        });
    }

    openComments(improvement: Improvement): void {
        const dialogRef = this.dialog.open(ImprovementCommentsComponent, {
            width: '600px',
            maxWidth: 'calc(100vw - 24px)',
            maxHeight: '90vh',
            autoFocus: 'first-tabbable',
            data: improvement
        });

        dialogRef.afterClosed().subscribe((saved) => {
            if (saved) {
                this.loadImprovements();
            }
        });
    }

    createImprovement(): void {
        const dialogRef = this.dialog.open(CreateImprovementComponent, {
            width: '520px',
            maxWidth: 'calc(100vw - 24px)',
            maxHeight: '90vh',
            autoFocus: 'first-tabbable'
        });

        dialogRef.afterClosed().subscribe((saved) => {
            if (saved) {
                this.loadImprovements();
            }
        });
    }

    getStatusClass(status: string): string {
        return `status-${status}`;
    }

    getStatusLabel(status: string): string {
        return status.replace('_', ' ');
    }
}
