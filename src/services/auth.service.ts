import { request } from '@services/http.service';

export const login = (params: any) => request('/api/auth/login', 'POST', params);

export const me = () => request('/api/auth/me', 'GET', null, { needsAuth: true });

export const register = (params: any) => request('/api/auth/login', 'POST', params);
