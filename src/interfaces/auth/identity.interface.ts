export interface User {
    auth: { token: string };
    profileImage: string | undefined;
    dateOfBirth: Date,
    fullName: string,
    email: string,
    phone: string,
    age: number;
    role: 'Patient' | 'Doctor',
}
