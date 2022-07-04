import { TimeInterval } from './timeinterval.interface';

export enum Days {
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
}

export interface Workday {
    day: Days;
    workingHours: TimeInterval[];
}
