import React, { FC } from 'react';

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: FC<HeaderProps> = ({ title, subtitle }) => (
    <header className="w-full my-4 mb-10 space-y-1">
        <h1 className="text-2xl font-medium tracking-tight lg:text-3xl">{title}</h1>
        <h2 className="lg:text-lg">{subtitle}</h2>
    </header>
);

export default Header;
