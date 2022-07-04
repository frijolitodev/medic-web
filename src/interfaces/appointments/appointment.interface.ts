import { Identifiable } from '@interfaces/common/identifiable.interface';
import { Clinic } from '@interfaces/doctor/clinic.interface';
import { Doctor } from '@interfaces/doctor/doctor.interface';

export interface Appointment extends Identifiable {
    date: Date;
    doctor: Doctor;
    clinic: Clinic;
    isAccepted: boolean;
}
