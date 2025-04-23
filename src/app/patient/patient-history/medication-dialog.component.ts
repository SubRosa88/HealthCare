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
      <h2>Medication Details</h2>
      <form [formGroup]="medicationForm" (ngSubmit)="onSubmit()">
        <div class="p-field">
          <label for="name">Medication Name</label>
          <input id="name" type="text" pInputText formControlName="name" />
        </div>
        <div class="p-field">
          <label for="dosage">Posologia</label>
          <input id="dosage" type="text" pInputText formControlName="dosage" />
        </div>
        <div class="p-field">
          <label for="start">Data Inicio</label>
          <input id="start" type="date" pInputText formControlName="start" />
        </div>
        <div class="p-field">
          <label for="end">Data Fim</label>
          <input id="end" type="date" pInputText formControlName="end" />
        </div>
        <div class="p-mt-4">
          <p-button label="Submit" type="submit" [disabled]="!medicationForm.valid" styleClass="p-mr-2"></p-button>
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
export class MedicationDialogComponent implements OnInit {
  medicationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.medicationForm = this.fb.group({
      name: ['', Validators.required],
      dosage: [''],
      start: [''],
      end: ['']
    });
  }

  ngOnInit(): void {
    if (this.config.data?.medication) {
      this.medicationForm.patchValue(this.config.data.medication);
    }
  }

  onSubmit(): void {
    if (this.medicationForm.valid) {
      this.ref.close(this.medicationForm.value);
    }
  }

  onCancel(): void {
    this.ref.close(null);
  }
}
