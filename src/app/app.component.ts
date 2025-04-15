import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { DataService } from './shared/data.service';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, AvatarModule, MenuModule, ToolbarModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: any; // Will be set in constructor
  menuItems: MenuItem[] = [];
  roleItems: MenuItem[] = [];
  currentRole: string = '';

  constructor(private dataService: DataService, private router: Router) {
    this.user = this.dataService.getUser();
    this.roleItems = this.user.roles.map((role: string) => ({
      label: role.charAt(0).toUpperCase() + role.slice(1),
      command: () => this.onRoleChange(role),
    }));
    this.currentRole = this.user.roles[0];
    this.updateMenuItems(this.currentRole); // Set initial menu items
    this.dataService.currentRole$.subscribe(role => {
      this.currentRole = role;
      this.updateMenuItems(role);
    });
  }

  onRoleChange(role: string): void {
    this.dataService.setCurrentRole(role);
    this.router.navigate([`/${role}/${this.getDefaultRoute(role)}`]);
  }

  updateMenuItems(role: string): void {
    switch (role) {
      case 'patient':
        this.menuItems = [
          { label: 'Profile', routerLink: '/patient/profile' },
          { label: 'Medical History', routerLink: '/patient/history' },
          { label: 'Appointments', routerLink: '/patient/appointments' },
        ];
        break;
      case 'doctor':
        this.menuItems = [
          { label: 'Profile', routerLink: '/doctor/profile' },
          { label: 'Patients', routerLink: '/doctor/patients' },
        ];
        break;
      case 'admin':
        this.menuItems = [
          { label: 'Manage Doctors', routerLink: '/admin/doctors' },
        ];
        break;
    }
  }

  getDefaultRoute(role: string): string {
    switch (role) {
      case 'patient': return 'profile';
      case 'doctor': return 'profile';
      case 'admin': return 'doctors';
      default: return '';
    }
  }
}
