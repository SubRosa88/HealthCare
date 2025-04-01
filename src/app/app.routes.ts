import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/patient/profile', pathMatch: 'full' },
  {
    path: 'patient',
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', loadComponent: () => import('./patient/patient-profile/patient-profile.component').then(m => m.PatientProfileComponent) },
      { path: 'history', loadComponent: () => import('./patient/patient-history/patient-history.component').then(m => m.PatientHistoryComponent) },
      { path: 'appointments', loadComponent: () => import('./patient/patient-appointments/patient-appointments.component').then(m => m.PatientAppointmentsComponent) },
    ],
  },
  {
    path: 'doctor',
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', loadComponent: () => import('./doctor/doctor-profile/doctor-profile.component').then(m => m.DoctorProfileComponent) },
      { path: 'patients', loadComponent: () => import('./doctor/doctor-patients/doctor-patients.component').then(m => m.DoctorPatientsComponent) },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'doctors', pathMatch: 'full' },
      { path: 'doctors', loadComponent: () => import('./admin/admin-doctors/admin-doctors.component').then(m => m.AdminDoctorsComponent) },
    ],
  },
];
