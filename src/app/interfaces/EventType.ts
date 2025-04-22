export interface EventType {
    id: number;
    date: Date;
    type: string;
    title: string;
    subtitle: string;
    description: string;
    where: string;
    notes:string;
    chips: string[];
    doctor: string;
    expertise: string;
    files: File[];
  }