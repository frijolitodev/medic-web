import { useAuth } from '@context/authContext';
import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
    const auth = useAuth();

    if (!auth.user) return null;

    return auth.user
        ? children as ReactElement
        : <Navigate to="/login" replace /> as ReactElement;
};

export default RequireAuth;
