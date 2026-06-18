import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import appData from '../../../../assets/data.json';
import { ApiService } from '../../services/api.service';
import { ButtonComponent } from "../../widgets/button/button.component";
import { InputComponent } from "../../widgets/input/input.component";
import { SelectComponent } from "../../widgets/select/select.component";

@Component({
  selector: 'app-create-item',
  imports: [MatDialogContent, InputComponent, MatDialogActions, ButtonComponent, FormsModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss'
})

export class CreateItemComponent implements OnInit
{

  itemForm!: FormGroup;
  gstRateOptions = appData.gstRates;
  unitOptions = appData.units;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateItemComponent>, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void
  {
    this.createForm();

    if (this.dialogData?._id)
    {
      this.itemForm.patchValue({
        id: this.dialogData._id,
        name: this.dialogData.name,
        price: this.dialogData.price,
        hsnCode: this.dialogData.hsnCode,
        gstRate: String(this.dialogData.gstRate ?? 18),
        unit: this.dialogData.unit ?? this.dialogData.measurement ?? 'nos'
      });
    }
  }

  createForm()
  {
    this.itemForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      hsnCode: [''],
      gstRate: ['18'],
      unit: ['nos']
    });
  }

  create()
  {
    if (this.itemForm.valid)
    {
      const payload = {
        ...this.itemForm.value,
        gstRate: Number(this.itemForm.value.gstRate)
      };

      if (this.dialogData?._id)
      {
        this.apiService.editItem(payload).subscribe((res: any) =>
        {
          if (res && res.success)
          {
            this.close(true);
          }
        });
      } else
      {
        this.apiService.createItem(payload).subscribe((res: any) =>
        {
          if (res && res.success)
          {
            this.close(true);
          }
        });
      }
    }
  }

  close(res: boolean = false)
  {
    this.dialogRef.close(res);
  }

}
