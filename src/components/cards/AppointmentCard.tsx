import { justTimeFormat, longDateTimeFormat } from 'src/constants/time';
import { Appointment } from '@interfaces/appointments/appointment.interface';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import CardBase from './CardBase';

interface AppointmentCardProps {
    appointment: Appointment;
}

const AppointmentCard: FC<AppointmentCardProps> = (
    {
        appointment: {
            id, doctor, clinic, date, isAccepted,
        },
    },
) => {
    const longDate = new Date(date).toLocaleDateString('es-sv', longDateTimeFormat);
    const justTime = new Date(date).toLocaleTimeString('es-sv', justTimeFormat);

    return (
        <CardBase>
            <figure>
                <img className="lg:w-48" src={doctor.profileImage} alt={doctor.fullName} />
            </figure>
            <div className="card-body">
                <h1 className="card-title">
                    {doctor.fullName}
                    {
                        isAccepted
                            ? <span className="badge badge-md badge-primary">Aceptada</span>
                            : <span className="badge badge-md badge-warning">Pendiente</span>
                    }
                </h1>
                <p>
                    Tu cita es el día
                    {' '}
                    { longDate }
                    {' '}
                    a las
                    {' '}
                    { justTime }
                    {' '}
                    en
                    {' '}
                    <span className="font-bold">{clinic.name}</span>
                </p>
                <div className="card-actions justify-end">
                    <Link to="/" className="btn btn-primary">Ver más</Link>
                </div>
            </div>
        </CardBase>
    );
};

export default AppointmentCard;
