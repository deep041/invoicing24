import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../common/widgets/input/input.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../common/services/data.service';

@Component({
    selector: 'app-login',
    imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder, private dataService: DataService) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    redirect(route: string) {
        this.router.navigate([route]);
    }

    login() {
        this.apiService.login(this.loginForm.value).subscribe((response: any) => {
            if (response.success) {
                this.dataService.setToken(response.data.token);
                this.dataService.setLocalStorage('name', response.data.firstName + ' ' + response.data.lastName);
                this.redirect('dashboard');
            }
        });
    }
}
