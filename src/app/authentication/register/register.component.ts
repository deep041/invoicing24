import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../common/widgets/input/input.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {

    registrationForm!: FormGroup;

    constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.createForm();
    }

    redirect(route: string) {
        this.router.navigate([route]);
    }

    createForm() {
        this.registrationForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(8)]]
        });
    }

    register() {
        if (this.registrationForm.valid) {
            this.apiService.register(this.registrationForm.value).subscribe((data: any) => {
                if (data.success) {
                    this.redirect('authentication/login');
                }
            });
        }
    }

}
