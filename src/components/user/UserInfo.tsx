import React, { FC } from 'react';

import { useAuth } from '@context/authContext';

const UserInfo: FC = () => {
    const { user } = useAuth();

    const firstName = user?.fullName.split(' ')[0];

    return (
        <div className="w-full centered-xy flex-col">
            <div className="flex flex-col items-center space-y-5">
                <figure className="w-48 h-48 bg-white rounded-full border-4 border-accent centered-xy">
                    {
                        user?.profileImage !== ''
                            ? <img className="rounded-full" src={user!.profileImage} alt="profile" />
                            : <div className="rounded-full" />
                    }
                </figure>
                <h1 className="font-medium text-2xl lg:text-3xl">
                    Hola,
                    {' '}
                    { firstName }
                </h1>
            </div>
        </div>
    );
};

export default UserInfo;
