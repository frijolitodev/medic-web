import React, { FC, PropsWithChildren } from 'react';

import Navbar from '@components/navbar/Navbar';
import Spinner from '@components/spinner';
import { useAuth } from '@context/authContext';

interface LayoutProps extends PropsWithChildren {
    isLoading?: boolean;
    hasMenu?: boolean;
    hasFooter?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, isLoading, hasMenu }) => {
    const { loading } = useAuth();

    return (
        <>
            {(loading || isLoading) && <Spinner />}
            {hasMenu && <Navbar />}
            <main className="max-w-screen-xl mx-auto px-10">
                {children}
            </main>
        </>
    );
};

export default Layout;
