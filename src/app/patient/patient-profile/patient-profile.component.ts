import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CountryService } from '../../shared/country.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { NgModule } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';



@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    DividerModule,
    CommonModule, 
    CardModule, 
    FormsModule, 
    FieldsetModule, 
    ButtonModule, 
    RouterModule, 
    FileUploadModule, 
    InputTextModule, 
    SelectModule, 
    AutoCompleteModule, 
    IconFieldModule, 
    InputIconModule, 
    FormsModule, 
    FloatLabelModule, 
    DatePickerModule,
    DropdownModule,
    CalendarModule,
    ],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss'
})
export class PatientProfileComponent implements OnInit {
  maritalStatusOptions = [
    { label: 'Casado', value: 'casado' },
    { label: 'Solteiro', value: 'solteiro' },
    { label: 'Divorciado', value: 'divorciado' },
    { label: 'Viúvo', value: 'viuvo' },
    { label: 'Outro', value: 'outro' }
  ];  

  bloodTypeOptions= [
    { label: 'A+', value: 'A+' },
    { label: 'B', value: 'B' },
    { label: 'O', value: 'O' }
  ]

  locationOptions=[
    { label: 'Lisboa', value: 'lisboa' },
    { label: 'Faro', value: 'faro' },
    { label: 'Porto', value: 'porto' }
  ]

  sexOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' }
  ];
  nationalityOptions = [
    { label: 'Portugal', value: 'PT' },
    { label: 'Brasil', value: 'BR' }
    // Add more as needed
  ];

  uploadedFiles: any[] = [];

  filteredCountries: any[] = [];
  locked1: boolean = false; // PERGUNTAR AO SIXTY LOCKED REPETIDO EM BAAIXO

  user: any;
  locked: boolean = true;

  
  constructor(private dataService: DataService, private countryService: CountryService) {}

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
  changeProfileInfo(): void {
  }  
  search(event: any) {
    this.filteredCountries = this.countryService.filterCountries(event.query);
  }

  onSelect(event: any) {
    this.user.nationality = event.value.code;
  }

  isEdit = false;

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  onUpload(event: any) {
    this.uploadedFiles = event.files;
    // Add your upload logic here (e.g., send to server)
    console.log('Files uploaded:', this.uploadedFiles);
  }

  onSubmit() {
    console.log('Dados submetidos:', this.user);
    // Aqui você pode fazer o tratamento dos dados (por exemplo, enviar a uma API)
  }
}