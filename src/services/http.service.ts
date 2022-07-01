import { ExtraOptions, Options } from '@interfaces/options.interface';
import axios, { Method } from 'axios';
import { stringify } from 'querystring';

const createUrl = (url: string) => `${import.meta.env.VITE_API_URL!}${url}`;

const getCookie = (name: string) => document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
}, '');

export const catchHandler = (error: any) => Promise.reject(error.error || error.response || error);

export const request = async (
    url: string,
    method: Method,
    params?: any,
    extraOptions?: ExtraOptions,
) => {
    const completeUrl = createUrl(url);
    const { needsAuth, isMultipart } = extraOptions || {};

    const auth = `Bearer ${getCookie('auth-token')?.toString()}`;
    const preHeader = needsAuth && auth && { Authorization: auth };
    const headers: any = isMultipart ? { 'content-type': 'multipart/form', ...preHeader } : preHeader;

    const options: Options = {};

    if (method === 'GET' && params) {
        options.params = params;
        options.paramsSerializer = (p) => stringify(p);
    } else {
        options.data = params;
    }

    return axios({
        url: completeUrl,
        method,
        headers,
        ...options,
    })
        .then((res) => res.data)
        .catch(catchHandler);
};
