import { request } from './http.service';

export const myAppointments = () => request('/api/appointment/mine', 'GET', null, { needsAuth: true });

export const getById = (id: number) => request(`/api/appointment/mine/${id}`, 'GET', null, { needsAuth: true });

export const myAppointmentsAsDoctor = () => request('/api/appointment/doctor/mine', 'GET', null, { needsAuth: true });

export const acceptAppointment = (id: number) => request(`/api/appointment/accept/${id}`, 'PATCH', null, { needsAuth: true });

export const deleteAppointment = (id: number) => request(`/api/appointment/delete/${id}`, 'DELETE', null, { needsAuth: true });

export const updateAppointment = (id: number, params: any) => request(`/api/appointment/update/${id}`, 'PATCH', params, { needsAuth: true });

export const createAppointment = (params: any) => request('/api/appointment/new', 'POST', params, { needsAuth: true });
