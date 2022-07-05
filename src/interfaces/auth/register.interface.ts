import { ILogin } from './login.interface';

export interface Register extends ILogin {
    img?: any;
    name: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    role: 'patient' | 'doctor';
}
