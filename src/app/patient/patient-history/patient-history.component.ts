import { Component, OnInit } from '@angular/core';
import { DataService, MedicalEvent } from '../../shared/data.service';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patient-history',
  standalone: true,
  imports: [CommonModule, CardModule, AccordionModule],
  templateUrl: './patient-history.component.html',
  styleUrl: './patient-history.component.scss',
  
})
export class PatientHistoryComponent implements OnInit {
  medicalHistory$!: Observable<MedicalEvent[]>;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.medicalHistory$ = this.dataService.medicalHistory$;
  }
}
