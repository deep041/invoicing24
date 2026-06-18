import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../common/widgets/input/input.component';
import { ButtonComponent } from '../../common/widgets/button/button.component';
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../common/services/data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    imports: [InputComponent, ButtonComponent, ReactiveFormsModule, MatIconModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private fb: FormBuilder,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    redirect(route: string): void {
        this.router.navigate([route]);
    }

    login(): void {
        this.apiService.login(this.loginForm.value).subscribe((response: { success: boolean; data: { token: string; firstName: string; lastName: string } }) => {
            if (response.success) {
                this.dataService.setToken(response.data.token);
                this.dataService.setLocalStorage('name', response.data.firstName + ' ' + response.data.lastName);
                this.redirect('dashboard');
            }
        });
    }
}
