import { User } from '@interfaces/auth/identity.interface';
import { Schedule } from '@interfaces/timemeasures/schedule.interface';
import { Clinic } from './clinic.interface';
import { Experience } from './experience.interface';
import { Formation } from './formation.interface';

export interface Doctor extends User {
    specialty: string;
    clinics: Clinic[];
    formation: Formation[];
    experience: Experience[];
    schedule: Schedule;
}
