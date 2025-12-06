import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../common/widgets/input/input.component";
import { TextareaComponent } from "../../common/widgets/textarea/textarea.component";
import { ApiService } from '../../common/services/api.service';

@Component({
    selector: 'app-company-details',
    imports: [ButtonComponent, FormsModule, ReactiveFormsModule, InputComponent, TextareaComponent],
    templateUrl: './company-details.component.html',
    styleUrl: './company-details.component.scss'
})

export class CompanyDetailsComponent implements OnInit {

    companyDetailsForm!: FormGroup;

    constructor(private fb: FormBuilder, private apiService: ApiService) {}

    ngOnInit(): void {
        this.createForm();

        this.getData();
    }

    createForm() {
        this.companyDetailsForm = this.fb.group({
            name: ['', Validators.required],
            contactNo: ['', Validators.required],
            address: ['', Validators.required]
        });
    }

    getData() {
        this.apiService.getCompanyDetails().subscribe((res: any) => {
            if (res && res.success) {
                this.companyDetailsForm.patchValue({
                    name: res.data.name,
                    contactNo: res.data.contactNo,
                    address: res.data.address 
                });
            }
        })
    }

    save() {
        this.apiService.addCompanyDetails(this.companyDetailsForm.value).subscribe((res: any) => {
            if (res && res.success) {

            }
        });
    }
}
