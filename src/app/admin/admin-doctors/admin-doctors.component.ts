import { Component, OnInit } from '@angular/core';
import { DataService, Doctor } from '../../shared/data.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-doctors',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, ButtonModule],

  templateUrl: './admin-doctors.component.html',
  styleUrl: './admin-doctors.component.scss'
})
export class AdminDoctorsComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.doctors$.subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataService.doctors$.subscribe(doctors => {
      this.doctors = doctors.filter(d =>
        d.name.toLowerCase().includes(filterValue) ||
        d.specialty.toLowerCase().includes(filterValue)
      );
    });
  }

  approve(doctorId: string): void {
    this.dataService.approveDoctor(doctorId);
  }

  revoke(doctorId: string): void {
    this.dataService.revokeDoctor(doctorId);
  }
}
