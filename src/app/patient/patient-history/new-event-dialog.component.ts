import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medication-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add this to support [formGroup]
    ButtonModule,
    InputTextModule
  ],
  template: `
    <div class="p-fluid">
      <form [formGroup]="medicalForm" (ngSubmit)="onSubmit()">
        <div class="p-field">
          <label for="where">Title</label>
          <input id="title" type="text" pInputText formControlName="title" />
        </div>
        <div class="p-field">
          <label for="where">Local</label>
          <input id="where" type="text" pInputText formControlName="where" />
        </div>
        <div class="p-field">
          <label for="medic">Medic</label>
          <input id="medic" type="text" pInputText formControlName="medic" />
        </div>
        <div class="p-field">
          <label for="date">Date</label>
          <input id="date" type="date" pInputText formControlName="date" />
        </div>
        <div class="p-field">
          <label for="subtitle">Appointment</label>
          <input id="subtitle" type="text" pInputText formControlName="subtitle" />
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
