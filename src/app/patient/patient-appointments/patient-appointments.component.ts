import { Component, OnInit } from '@angular/core';
import { DataService, Appointment, Doctor } from '../../shared/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    StepperModule,
    AutoCompleteModule,
    CalendarModule,
    DatePickerModule
    // Add more PrimeNG modules as needed
  ],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.scss',
})
export class PatientAppointmentsComponent implements OnInit {
  user: any;
  appointments$!: Observable<Appointment[]>;
  doctors: Doctor[] = [];

  // Separate fields for Médico and Especialidade
  medicoValue: string = '';
  medicoItems: string[] = [];

  especialidadeValue: string = '';
  especialidadeItems: string[] = [];

  // Notes
  notes: string = '';

  // Date, Time, etc.
  date: Date | undefined;
  minDate: Date = new Date(); // Ensures only future dates are selectable
  maxDate!: Date;
  selectedTime: string = '';
  timeSlots: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '13:00', '13:30', '14:00',
    '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]; // 18 slots for 6x3 grid


  constructor(private dataService: DataService) {
    // Example: date range from tomorrow to +1 month
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow;

    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 1);

    this.generateTimeSlots();
  }

  ngOnInit(): void {
    // Get user/doctors from service
    this.user = this.dataService.getUser();
    this.doctors = this.dataService.getDoctors().filter(d => d.status === 'active');

    // Filter appointments for the current user
    this.appointments$ = this.dataService.appointments$.pipe(
      map(appointments => appointments.filter(a => a.patientId === this.user.id))
    );
  }

  // Autocomplete search methods
  searchMedico(event: any): void {
    const query = event.query.toLowerCase();
    this.medicoItems = this.dataService
      .getDoctors()
      .map(doctor => doctor.name)
      .filter(name => name.toLowerCase().includes(query));
  }

  searchEspecialidade(event: any): void {
    const query = event.query.toLowerCase();
    this.especialidadeItems = this.dataService
      .getDoctors()
      .map(doctor => doctor.specialty)
      .filter(especialidade => especialidade.toLowerCase().includes(query));
  }

  generateTimeSlots(): void {
    const slots: string[] = [];
    let hour = 9;
    let minute = 0;

    // 30-minute increments from 09:00 to 18:00
    while (hour < 18 || (hour === 18 && minute === 0)) {
      const time = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
      slots.push(time);

      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour++;
      }
    }
    // Limit if desired; example slices to 18 total slots
    this.timeSlots = slots.slice(0, 18);
  }

  // Submit new appointment
  submitForm(): void {
    if (this.medicoValue && this.especialidadeValue && this.date && this.selectedTime) {
      const formattedDate = this.date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const newAppointment: Appointment = {
        id: `a${this.dataService.getAppointments().length + 1}`,
        patientId: this.user.id,
        doctorId: this.medicoValue,
        date: formattedDate,
        time: this.selectedTime,
        status: 'pending',
        // notes: this.notes  (if supported in Appointment interface)
      };

      this.dataService.bookAppointment(newAppointment);
      this.resetForm();
    }
  }

  cancelAppointment(appointmentId: string): void {
    this.dataService.cancelAppointment(appointmentId);
  }

  resetForm(): void {
    // Clears everything
    this.medicoValue = '';
    this.especialidadeValue = '';
    this.medicoItems = [];
    this.especialidadeItems = [];
    this.date = undefined;
    this.selectedTime = '';
    this.notes = '';
  }
}
