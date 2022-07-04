import React, { FunctionComponent } from 'react';

import { IMenuProps } from '@interfaces/menu.interface';
import { generate } from 'shortid';
import { useAuth } from '@context/authContext';
import { LogoutIcon } from '@heroicons/react/solid';

const Menu: FunctionComponent<IMenuProps> = ({ items, show }) => {
    const { logout } = useAuth();

    return (
        <div className={`transition-all duration-500 fixed top-0 left-0 bg-base-100 bg-opacity-80 ${show ? 'h-full w-full' : 'h-0 w-0'}`}>
            <nav className={`flex transition-all duration-500 ${show ? 'w-full md:w-2/5 lg:w-1/6' : 'w-0'} h-screen bg-white`}>
                <ul className={`flex flex-col relative w-full h-full transition-all duration-1000 ${show ? 'opacity-100' : 'opacity-0'} py-20 text-base-100`}>
                    { show ? items.map((it) => (
                        <li className="w-full transition-all duration-300 px-10 py-6 hover:text-white hover:bg-base-100" key={generate()}>
                            <a className="font-bold text-2xl" href={it.redirectTo}>{it.text}</a>
                        </li>
                    )) : null}
                    <li className="flex mt-auto transition-all duration-300 px-10 py-6 space-x-4 hover:text-white hover:bg-base-100" key={generate()}>
                        <LogoutIcon className="w-6" />
                        <button type="button" onClick={logout} className="font-bold text-2xl">Cerrar sesión</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
