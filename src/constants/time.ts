import { Days } from '@interfaces/timemeasures/workday.interface';

// eslint-disable-next-line import/prefer-default-export
export const longDateTimeFormat: Intl.DateTimeFormatOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
};

export const justTimeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit', minute: '2-digit',
};

const days = {
    Lunes: Days.MONDAY,
    Martes: Days.TUESDAY,
    Miercoles: Days.WEDNESDAY,
    Jueves: Days.THURSDAY,
    Viernes: Days.FRIDAY,
    Sabado: Days.SATURDAY,
    Domingo: Days.SUNDAY,
};

export const daysAsArray = Array.from(Object.entries(days));
