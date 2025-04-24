import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-medication-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add this to support [formGroup]
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
  ],
  template: `
    <div class="p-fluid" style="padding-top: 5px;">
      <form [formGroup]="medicalForm" (ngSubmit)="onSubmit()">
      <div class="p-field">
        <p-floatlabel variant="on">
          <input pInputText id="title" type="text" name="title" pInputText formControlName="title" />
          <label for="title">Title</label>
        </p-floatlabel>
        </div>
        <div class="p-field">
        <p-floatlabel variant="on">
          <input pInputText id="where" type="text" name="where" pInputText formControlName="where" />
          <label for="where">Where</label>
        </p-floatlabel>
        </div>
        <div class="p-field">
        <p-floatlabel variant="on">
          <input pInputText id="medic" type="text" name="medic" pInputText formControlName="medic" />
          <label for="medic">Medic</label>
        </p-floatlabel>
        </div>
        <div class="p-field">
        <p-floatlabel variant="on">
          <input pInputText id="date" type="date" name="date" pInputText formControlName="date" [placeholder]="" />
          <label for="date">Date</label>
        </p-floatlabel>
        </div>
        <div class="p-field">
        <p-floatlabel variant="on">
          <input pInputText id="appointments" type="text" name="appointments" pInputText formControlName="appointments" />
          <label for="appointments">Appointments</label>
        </p-floatlabel>
        </div>
        <div class="p-mt-4">
          <p-button label="Submit" type="submit" [disabled]="!medicalForm.valid" styleClass="p-mr-2"></p-button>
          <p-button label="Cancel" (click)="onCancel()" styleClass="p-button-secondary"></p-button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .p-field {
      margin-bottom: 1rem;
    }

  `]
})
export class NewEventDialogComponent implements OnInit {
  medicalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.medicalForm = this.fb.group({
      title: ['',Validators.required],
      where: ['', Validators.required],
      medic: [''],
      date:  [null,Validators.required],
      subtitle: [''],
      description: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    if (this.config.data?.medication) {
      this.medicalForm.patchValue(this.config.data.medication);
    }
  }

  onSubmit(): void {
    if (this.medicalForm.valid) {
      const formValue = { ...this.medicalForm.value };
      // Ensure date is a Date object
      formValue.date = formValue.date instanceof Date ? formValue.date : new Date(formValue.date);
      this.ref.close(formValue);
    }
  }

  onCancel(): void {
    this.ref.close(null);
  }
}
