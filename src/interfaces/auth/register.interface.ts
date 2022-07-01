import { ILogin } from './login.interface';

export interface IRegister extends ILogin {
    name: string;
    lastName: string;
    phone: string;
    age: number;
    role: 'patient' | 'doctor';
}
