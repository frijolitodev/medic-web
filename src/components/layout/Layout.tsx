import React, { FC, PropsWithChildren } from 'react';

import Navbar from '@components/navbar/Navbar';
import Spinner from '@components/spinner';
import { useAuth } from '@context/authContext';
import classNames from 'classnames';
import { Toaster } from 'react-hot-toast';

interface LayoutProps extends PropsWithChildren {
    isLoading?: boolean;
    hasMenu?: boolean;
    hasFooter?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, isLoading, hasMenu }) => {
    const { loading } = useAuth();

    return (
        <>
            <Toaster position="bottom-center" />
            {(loading || isLoading) && <Spinner />}
            {hasMenu && <Navbar />}
            <main className={classNames('max-w-screen-xl mx-auto', { 'px-10': hasMenu })}>
                {children}
            </main>
        </>
    );
};

export default Layout;
