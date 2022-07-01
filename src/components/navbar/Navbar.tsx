import React, { FunctionComponent, useState } from 'react';

import Menu from '@components/menu';

const Navbar: FunctionComponent = () => {
    const [showNav, setShowNav] = useState(false);

    const items = [
        { text: 'Link 1', redirectTo: '/' },
        { text: 'Link 2', redirectTo: '/' },
        { text: 'Link 3', redirectTo: '/' },
    ];

    return (
        <div className=" sticky top-0 z-50 flex items-center justify-end py-2 px-4 md:py-6">
            <div className={`${showNav ? 'relative z-50' : ''}`} onClick={() => setShowNav(!showNav)}>
                <div className={`transition-all ${showNav ? 'opacity-0' : ''} bg-white h-1 w-10 rounded-xl my-2`} />
                <div className={`transition-all duration-700 ${showNav ? 'transform-gpu rotate-180 bg-black md:bg-white' : 'bg-white'} h-1 w-10 rounded-xl my-2`} />
                <div className={`transition-all ${showNav ? 'opacity-0' : ''} bg-white h-1 w-10 rounded-xl my-2`} />
            </div>
            <Menu items={items} show={showNav} />
        </div>
    );
};

export default Navbar;
