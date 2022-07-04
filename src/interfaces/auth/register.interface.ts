import { ILogin } from './login.interface';

export interface IRegister extends ILogin {
    img?: any;
    name: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    role: 'patient' | 'doctor';
}
