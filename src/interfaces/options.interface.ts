export interface Options {
    params?: any;
    paramsSerializer?: (p: any) => string;
    data?: any;
}

export interface ExtraOptions {
    needsAuth?: boolean;
    isMultipart?: boolean;
}
