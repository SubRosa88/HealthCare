import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MedicationDialogComponent } from './medication-dialog.component';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { MedicalEvent2 } from '../../interfaces/MedicalEvent';
import { Medication } from '../../interfaces/MedicalEvent';
import {NewEventDialogComponent} from './new-event-dialog.component'


@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    CommonModule,
    TimelineModule,
    CardModule,
    AccordionModule,
    ButtonModule,
    FileUploadModule,
    BadgeModule,
    TableModule,
  ],
  templateUrl: './patient-history.component.html',
  styleUrl: './patient-history.component.scss',
  providers: [DialogService]
})

export class TimelineComponent {
  events : MedicalEvent2[] = [
    {
      id: 1,
      title: 'Consulta Médica',
      date: new Date('2023-05-15'),
      subtitle: 'Check-up anual',
      where: 'Clínica Central',
      description: 'Consulta de rotina para exames gerais.',
      notes: 'Tomar vacina contra gripe.',
      files: [{ name: 'exame1.pdf' }, { name: 'exame2.jpg' }],
      medication: [{ name: 'Paracetamol', dosage: '500mg', frequency: '8h', start: new Date(), end: new Date(), notes: "some notes" }]
    },
    {
      id: 1,
      title: 'Consulta Médica',
      date: new Date('2021-05-15'),
      subtitle: 'Check-up anual',
      where: 'Clínica Central',
      description: 'Consulta de rotina para exames gerais.',
      notes: 'Tomar vacina contra gripe.',
      files: [{ name: 'exame1.pdf' }, { name: 'exame2.jpg' }],
      medication: [{ name: 'Paracetamol', dosage: '500mg', frequency: '8h', start: new Date(), end: new Date(), notes: "some notes" }]
    },
    {
      id: 1,
      title: 'Consulta Médica',
      date: new Date('2024-05-15'),
      subtitle: 'Check-up anual',
      where: 'Clínica Central',
      description: 'Consulta de rotina para exames gerais.',
      notes: 'Tomar vacina contra gripe.',
      files: [{ name: 'exame1.pdf' }, { name: 'exame2.jpg' }],
      medication: [{ name: 'Paracetamol', dosage: '500mg', frequency: '8h', start: new Date(), end: new Date(), notes: "some notes" }]
    }
  ];

  constructor(private dialogService: DialogService) {
    this.sortEventsAsc();
  }

  buildSubtitle(date: Date, subtitle: string, where: string): string {
    return `${subtitle} - ${where}`;
  }

  onBasicUploadAuto(eventId: number, event: any): void {
    console.log(`Files uploaded for event ${eventId}:`, event.files);
  }

  openMedicationDialog(event: MedicalEvent2): void {
    const ref = this.dialogService.open(MedicationDialogComponent, {
      header: 'Medication',
      width: '30%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      data: { medication: event.medication || {} }
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        event.medication.push(result)
        console.log('Medication new:', result);
      }
    });
  }

  removeMedication(event: MedicalEvent2, medication: Medication) {
    if (event && event.medication) {
      const index = event.medication.indexOf(medication);
      if (index > -1) {
        event.medication.splice(index, 1);
      }
    }
  }

  openMedicalEventDialog(): void {
    const ref = this.dialogService.open(NewEventDialogComponent, {
      header: 'Medication',
      width: '30%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      data: { }
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        result.id= 3
        result.files=[]
        result.medication = []
        this.events = [...this.events, result];
        this.sortEventsAsc()
        console.log('Event new:', result);
        console.log(this.events)
      }
    });
  }

  sortEventsAsc(){
    this.events.sort((a,b) => b.date.getTime() - a.date.getTime())
  }
}
