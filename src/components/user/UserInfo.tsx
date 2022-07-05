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
                        user?.profileImage != null
                            ? <img className="rounded-full" src={user!.profileImage} alt="profile" />
                            : (
                                <div className="w-full h-full rounded-full avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full">
                                        <span className="font-bold text-5xl">{firstName![0]}</span>
                                    </div>
                                </div>
                            )
                    }
                </figure>
                <h1 className="font-medium text-2xl lg:text-3xl">
                    Hola,
                    {' '}
                    {firstName}
                </h1>
            </div>
        </div>
    );
};

export default UserInfo;
