import React, { FunctionComponent } from 'react';
import { IMenuProps } from '@interfaces/menu.interface';

const Menu: FunctionComponent<IMenuProps> = ({ items, show }) => (
    <div className={`transition-all duration-500 fixed top-0 left-0 bg-black bg-opacity-80 ${show ? 'h-full w-full' : 'h-0 w-0'}`}>
        <nav className={`transition-all duration-500 ${show ? 'w-full md:w-2/5 lg:w-1/6' : 'w-0'} h-screen bg-white`}>
            <ul className={`transition-all duration-1000 ${show ? 'opacity-100' : 'opacity-0'} pt-20 text-black`}>
                { show ? items.map((it, index) => (
                    <li className="transition-all duration-300 px-10 py-6 hover:text-white hover:bg-black" key={index}>
                        <a className="font-bold text-2xl" href={it.redirectTo}>{it.text}</a>
                    </li>
                )) : null}
            </ul>
        </nav>
    </div>
);

export default Menu;
