import React, { FC, useEffect, useId } from 'react';

import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { myAppointments } from '@services/appointment.service';
import { Appointment } from '@interfaces/appointments/appointment.interface';
import toast from 'react-hot-toast';
import AppointmentCard from '../cards/AppointmentCard';

const HasNoAppointments: FC = () => (
    <figure className="w-full card card-compact bg-slate-600 shadow-md max-w-screen-sm hover:bg-slate-700">
        <div className="card-body">
            <figcaption className="card-title text-error">No tienes citas próximas</figcaption>
            <p className="lg:text-lg">¿Necesitas agendar una?</p>
            <div className="card-actions justify-end">
                <Link to="/appointments" className="ml-auto btn btn-accent">Claro</Link>
            </div>
        </div>
    </figure>
);

const AppointmentsLoading: FC = () => (
    <div>
        Estamos trayendo tus citas
    </div>
);

const UserAppointments: FC = () => {
    const id = useId();

    const {
        data: userAppointments, isLoading, isError, error,
    } = useQuery('user-apts', myAppointments);

    useEffect(() => {
        if (isError && error) toast.error((error as any).message);
    }, [isError, error]);

    return (
        <section className="centered-xy flex-col">
            { isLoading && <AppointmentsLoading /> }
            <article className="w-full centered-xy flex-col space-y-4">
                <h1 className="text-lg">Acá tienes tus citas programadas 📅</h1>
                {
                    userAppointments != null && userAppointments?.length <= 0
                        ? <HasNoAppointments />
                        : (
                            userAppointments?.map(
                                (apt: Appointment, index: number) => (
                                    <AppointmentCard appointment={apt} key={`${id}-${index}`} />
                                ),
                            )
                        )
                }
            </article>
        </section>
    );
};

export default UserAppointments;
