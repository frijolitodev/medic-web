import { Clinic } from '@interfaces/doctor/clinic.interface';
import { Doctor } from '@interfaces/doctor/doctor.interface';
import { PropsWithChildren } from 'react';

export interface DatePicker {
    date: Date | string;
}

export interface HourPicker {
    hour: string;
}

export interface HourPickerProps<T> extends DatePicker, WithDispatchProps<T> {
    email: string;
}

export interface StepsProps extends PropsWithChildren {
    order: number;
    title: string;
    subtitle: string;
}

export interface LoadingModifierProps {
    // eslint-disable-next-line react/no-unused-prop-types
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WithDispatchProps<T> extends LoadingModifierProps {
    action: React.Dispatch<React.SetStateAction<T>>;
    unmounter?: () => void;
}

export interface ClinicsDisplayerProps<T> extends WithDispatchProps<T> {
    clinics: Clinic[];
}

export interface DoctorCardProps {
    doctor: Doctor;
    isSelected: boolean;
    onSelect: () => void;
    onUnselect: () => void;
}

export interface ClinicAsMapProps {
    clinic: Clinic;
    isSelected: boolean;
    onSelect: () => void;
    onUnselect: () => void;
}
