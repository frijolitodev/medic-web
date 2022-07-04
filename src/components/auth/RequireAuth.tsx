import { useAuth } from '@context/authContext';
import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const prevRoute = useLocation();

    return user
        ? children as ReactElement
        : <Navigate to="/login" state={{ location: prevRoute }} /> as ReactElement;
};

export default RequireAuth;
