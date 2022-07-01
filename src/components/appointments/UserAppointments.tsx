import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '@context/authContext';

const HasNoAppointments: FC = () => (
    <figure className="w-full card card-compact bg-slate-600 shadow-md max-w-screen-sm hover:bg-slate-700">
        <div className="card-body">
            <figcaption className="card-title text-error">No tienes citas próximas</figcaption>
            <p className="lg:text-lg">¿Necesitas agendar una?</p>
            <div className="card-actions justify-end">
                <Link to="/epxlore" className="ml-auto btn btn-accent">Claro</Link>
            </div>
        </div>
    </figure>
);

const UserAppointments: FC = () => {
    const { user } = useAuth();
    const today = new Date().toLocaleString('es-sv', { weekday: 'long', day: 'numeric' });

    return (
        <section className="centered-xy flex-col">
            {/* <h2>
                Tus citas de hoy
                {' '}
                {today}
            </h2> */}
            <HasNoAppointments />
        </section>
    );
};

export default UserAppointments;
