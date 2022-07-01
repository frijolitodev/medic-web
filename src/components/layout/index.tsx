import React, { FC, PropsWithChildren } from 'react';

import Spinner from '@components/spinner';

interface LayoutProps extends PropsWithChildren {
    isLoading?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, isLoading }) => (
    <>
        { isLoading && <Spinner /> }
        <div className="max-w-screen-2xl mx-auto">
            { children }
        </div>
    </>
);

export default Layout;
