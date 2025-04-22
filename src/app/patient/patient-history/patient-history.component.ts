import { Component, OnInit } from '@angular/core';
import { DataService, MedicalEvent } from '../../shared/data.service';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TimelineModule } from 'primeng/timeline';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { format } from 'date-fns';

import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { PersonType } from '../../interfaces/PersonType';
import { EventType } from '../../interfaces/EventType';


@Component({
  selector: 'app-patient-history',
  standalone: true,
  imports: [CommonModule,
    CardModule,
    AccordionModule,
    FileUploadModule,
    TimelineModule,
    BadgeModule,
    ButtonModule,
    DynamicDialogModule],
  templateUrl: './patient-history.component.html',
  styleUrl: './patient-history.component.scss',

})
export class PatientHistoryComponent implements OnInit {
  medicalHistory$!: Observable<MedicalEvent[]>;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.medicalHistory$ = this.dataService.medicalHistory$;
  }


  person: PersonType = {
    name: "John Doe",
    birth: "15-09-1981",
    sex: 'Masculino',
    height: 1.83,
    weight: 81,
    chips: ['Fumador', 'Perneta', 'Pele Atópica'],
    alergies: ['Penincelina', 'Amendoins', 'Leite'],
    notes: ["Doente toma medicação recorrente xxx"],
    ensurance: "Multicare",
  }

  events: EventType[] = [{
    id: 1,
    date:  new Date("2019-01-16"),
    type: "Consulta",
    title: "Alergologia",
    subtitle: "Despiste de Alergias",
    description: "O paciente queixa-se de alergias e precisa de saber a que o pe pode comer or não",
    where: "Hospital da Luz",
    notes: "Não foi encontrada nenhuma alergia adicional relevante",
    chips: [],
    doctor: "Gomes de Sá",
    expertise: "Alergologia",
    files: []
  },{
    id: 2,
    date:  new Date("2018-03-14"),
    type: "Internamento",
    title: "Acidente de Condução",
    subtitle: "Despiste de Mota",
    description: "Queda ligeira de mota, pequenas feridas, queimadura na perna, não houve fracturas.",
    where: "Hospital da Faro",
    notes: "Internamento 3 dias",
    chips: ["Queimadura", ""],
    doctor: "Pedro Lopes",
    expertise: "Urgencias",
    files: []
  }
];


buildSubtitle(date: Date, subtitle: string, where: string){
  const formattedDate: string = format(date, 'dd/MM/yyyy');
  return formattedDate + " - " + subtitle + " - " + where;
}

onBasicUploadAuto(event_id: number, files_event: FileUploadEvent) {
  let current_event = this.events.filter(x => x.id === event_id).pop();
  console.log(files_event.files.length);
  if(current_event){
    current_event.files = current_event.files.concat(files_event.files)
    console.log(current_event?.files.length);
  }
}
}
