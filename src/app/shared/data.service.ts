import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User { id: string; name: string; email: string; roles: string[]; status: 'active' | 'inactive' | 'pending'; }
export interface Doctor { id: string; workHoursStart?: string; workHoursEnd?: string; name: string; availability: 'static' | 'dynamic'; specialty: string; status: 'active' | 'inactive' | 'pending'; publicBio: string; privateNotes?: string; licenseUrl?: string; }
export interface Appointment { id: string; patientId: string; doctorId: string; date: string; time: string; status: 'pending' | 'completed'; }
export interface MedicalEvent { date: string; title: string; details: string; uploads?: string[]; }
export interface TimeSlot { start: string; end: string; }

@Injectable({ providedIn: 'root' })
export class DataService {
  private currentUser: User = { id: '1', name: 'Jane Doe', email: 'jane@example.com', roles: ['patient', 'doctor', 'admin'], status: 'pending'  };
  private doctors: Doctor[] = [
    { id: 'd1', name: 'Dr. Smith', availability: 'static', workHoursStart: '09:00', workHoursEnd: '18:00', specialty: 'Cardiology', status: 'active', publicBio: '20 years experience', privateNotes: 'Prefers mornings', licenseUrl: 'license1.jpg' },
    { id: 'd2', name: 'Dr. Jones', availability: 'dynamic', specialty: 'Pediatrics', status: 'pending', publicBio: 'New grad', privateNotes: '', licenseUrl: 'license2.pdf' },
  ];

  private timeslots: TimeSlot[] = [  {start:'08:00', end:'08:30'}, {start:'09:00', end:'09:30'}, {start:'10:00', end:'10:30'},
  {start:'11:00', end:'11:30'}, {start:'12:00', end:'13:00'}, {start:'13:30', end:'14:00'},
  {start:'14:30', end:'15:00'}, {start:'15:30', end:'16:00'}, {start:'16:30', end:'17:00'}]

  private appointments: Appointment[] = [
    { id: 'a1', patientId: '1', doctorId: 'd1', date: '2025-04-01', time: '10:00', status: 'pending' },
  ];
  private medicalHistory: MedicalEvent[] = [
    { date: '2023-05-01', title: 'Checkup', details: 'Normal BP', uploads: ['bp.pdf'] },
    { date: '2024-01-15', title: 'Flu Shot', details: 'No side effects' },
  ];

  private doctorsSubject = new BehaviorSubject<Doctor[]>(this.doctors);
  private appointmentsSubject = new BehaviorSubject<Appointment[]>(this.appointments);
  private medicalHistorySubject = new BehaviorSubject<MedicalEvent[]>(this.medicalHistory);
  private currentRoleSubject = new BehaviorSubject<string>(this.currentUser.roles[0]);
  private timeslotsSubject = new BehaviorSubject<TimeSlot[]>(this.timeslots);

  doctors$ = this.doctorsSubject.asObservable();
  appointments$ = this.appointmentsSubject.asObservable();
  medicalHistory$ = this.medicalHistorySubject.asObservable();
  currentRole$ = this.currentRoleSubject.asObservable();
  timeslots$ = this.timeslotsSubject.asObservable();

  getUser(): User { return this.currentUser; }
  getDoctors(): Doctor[] { return this.doctors; }
  getAppointments(patientId?: string): Appointment[] { return patientId ? this.appointments.filter(a => a.patientId === patientId) : this.appointments; }
  getMedicalHistory(patientId: string): MedicalEvent[] { return this.medicalHistory; }
  setCurrentRole(role: string): void { this.currentRoleSubject.next(role); }
  getTimeSlots(): TimeSlot[] { return this.timeslots; }
  bookAppointment(appointment: Appointment): void {
    this.appointments.push(appointment);
    this.appointmentsSubject.next(this.appointments);
  }

  cancelAppointment(appointmentId: string): void {
    this.appointments = this.appointments.filter(a => a.id !== appointmentId);
    this.appointmentsSubject.next(this.appointments);
  }

  approveDoctor(doctorId: string): void {
    const doctor = this.doctors.find(d => d.id === doctorId);
    if (doctor) {
      doctor.status = 'active';
      this.doctorsSubject.next(this.doctors);
    }
  }

  revokeDoctor(doctorId: string): void {
    const doctor = this.doctors.find(d => d.id === doctorId);
    if (doctor) {
      doctor.status = 'inactive';
      this.doctorsSubject.next(this.doctors);
    }
  }
}
