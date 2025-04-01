import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss',
})
export class DoctorProfileComponent implements OnInit {
  doctor: any; // Will be set in ngOnInit

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.doctor = this.dataService.getDoctors().find(d => d.id === 'd1');
  }
}
