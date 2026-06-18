import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../common/widgets/input/input.component";
import { TextareaComponent } from "../../common/widgets/textarea/textarea.component";
import { SelectComponent } from "../../common/widgets/select/select.component";
import { ApiService } from '../../common/services/api.service';
import { ToastService } from '../../common/services/toast.service';
import data from '../../../assets/data.json';

@Component({
    selector: 'app-company-details',
    imports: [ButtonComponent, FormsModule, ReactiveFormsModule, InputComponent, TextareaComponent, SelectComponent],
    templateUrl: './company-details.component.html',
    styleUrl: './company-details.component.scss'
})

export class CompanyDetailsComponent implements OnInit {

    companyDetailsForm!: FormGroup;
    stateOptions = [
        { label: 'Select State', value: '' },
        ...data.states.map((state) => ({ label: state.name, value: state.code }))
    ];

    constructor(private fb: FormBuilder, private apiService: ApiService, private toastService: ToastService) {}

    ngOnInit(): void {
        this.createForm();

        this.getData();
    }

    createForm() {
        this.companyDetailsForm = this.fb.group({
            name: ['', Validators.required],
            contactNo: ['', Validators.required],
            address: ['', Validators.required],
            stateCode: ['', Validators.required],
            gstNo: ['']
        });
    }

    getData() {
        this.apiService.getCompanyDetails().subscribe((res: any) => {
            if (res && res.success) {
                this.companyDetailsForm.patchValue({
                    name: res.data.name,
                    contactNo: res.data.contactNo,
                    address: res.data.address,
                    stateCode: res.data.stateCode,
                    gstNo: res.data.gstNo
                });
            }
        })
    }

    save() {
        this.apiService.addCompanyDetails(this.companyDetailsForm.value).subscribe((res: any) => {
            console.log(res);
            if (res && res.success) {
                this.toastService.show({ message: 'Company details updated successfully!', type: 'success' });
            }
        });
    }
}
