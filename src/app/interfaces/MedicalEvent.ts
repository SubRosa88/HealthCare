export interface InputFile {
  name: string;
}

export interface Medication {
  name: string;
  dosage: string;
  start: Date;
  end?: Date;
  notes?: string;
  frequency?: string;
}

export interface MedicalEvent2 {
  id: number;
  title: string;
  date: Date;
  subtitle: string;
  where: string;
  description: string;
  notes: string;
  files: InputFile[];
  medication: Medication[];
}
