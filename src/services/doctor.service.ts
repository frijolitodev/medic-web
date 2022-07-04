import { request } from './http.service';

export const getAll = (paging: any) => request('/api/doctor/all', 'GET', paging, { needsAuth: true });

export const getById = (email: string) => request(`/api/doctor/${email}`, 'GET', null, { needsAuth: true });

export const getAvailability = (email: string, date: string) => request(`/api/doctor/${email}/availability`, 'GET', date, { needsAuth: true });
