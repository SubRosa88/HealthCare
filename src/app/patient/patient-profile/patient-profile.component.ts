import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule, CardModule, FormsModule, FieldsetModule, ButtonModule, RouterModule],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent implements OnInit {
  maritalStatusOptions = [
    { label: 'Casado', value: 'casado' },
    { label: 'Solteiro', value: 'solteiro' },
    { label: 'Divorciado', value: 'divorciado' }
  ];
  user: any;
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.user = this.dataService.getUser();
    if (!this.user.allergies) this.user.allergies = '';
    if (!this.user.operations) this.user.operations = '';
    if (!this.user.chronicDiseases) this.user.chronicDiseases = '';
    if (!this.user.hereditaryProblems) this.user.hereditaryProblems = '';
    if (!this.user.familyBackground) this.user.familyBackground = '';
  }

  viewProfile(): void {
    console.log('Viewing profile:', this.user);
  }
}