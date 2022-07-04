import classNames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';

interface ExtendedDefaultProps extends PropsWithChildren {
    className?: string;
}

const CardBase: FC<ExtendedDefaultProps> = ({ children, className }) => (
    <div className={classNames(
        'card card-compact bg-slate-700 w-full max-w-screen-sm shadow-xl transition-all',
        className,
        'hover:bg-slate-600 lg:card-side',
    )}
    >
        {children}
    </div>
);

export default CardBase;
