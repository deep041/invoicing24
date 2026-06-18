import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../common/widgets/input/input.component';
import { ButtonComponent } from '../../common/widgets/button/button.component';
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-register',
    imports: [InputComponent, ButtonComponent, ReactiveFormsModule, MatIconModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

    registrationForm!: FormGroup;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    redirect(route: string): void {
        this.router.navigate([route]);
    }

    createForm(): void {
        this.registrationForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(8)]]
        });
    }

    register(): void {
        if (this.registrationForm.valid) {
            this.apiService.register(this.registrationForm.value).subscribe((data: { success: boolean }) => {
                if (data.success) {
                    this.redirect('authentication/login');
                }
            });
        }
    }
}
