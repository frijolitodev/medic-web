import React, { FC, PropsWithChildren } from 'react';

import Spinner from '@components/spinner';
import { useAuth } from '@context/authContext';

interface LayoutProps extends PropsWithChildren {
    isLoading?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, isLoading }) => {
    const { loading } = useAuth();

    return (
        <>
            {(loading || isLoading) && <Spinner />}
            <main className="max-w-screen-xl mx-auto p-10 space-y-10">
                {children}
            </main>
        </>
    );
};

export default Layout;
