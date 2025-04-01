import { Component, OnInit } from '@angular/core';
import { DataService, MedicalEvent, Appointment } from '../../shared/data.service'; // Added Appointment
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-patients',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, AccordionModule],

  templateUrl: './doctor-patients.component.html',
  styleUrl: './doctor-patients.component.scss'
})
export class DoctorPatientsComponent implements OnInit {
  doctor: any;
  appointments$!: Observable<Appointment[]>;
  patientHistory$!: Observable<MedicalEvent[]>;
  patientName: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.doctor = this.dataService.getDoctors().find(d => d.id === 'd1');
    this.patientName = this.dataService.getUser().name;
    this.appointments$ = this.dataService.appointments$.pipe(
      map(appointments => appointments.filter(a => a.doctorId === this.doctor?.id))
    );
    this.patientHistory$ = this.dataService.medicalHistory$;
  }
}


