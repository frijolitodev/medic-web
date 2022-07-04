import { ClinicAsMap } from '@components/clinics';
import { DatePickerDisplayer, HourPickerDisplayer } from '@components/displayers';
import ClinicsDisplayer from '@components/displayers/ClinicsDisplayer';
import DoctorsDisplayer from '@components/displayers/DoctorsDisplayer';
import Header from '@components/header';
import Layout from '@components/layout';
import { Clinic } from '@interfaces/doctor/clinic.interface';
import { Doctor } from '@interfaces/doctor/doctor.interface';
import { StepsProps } from '@interfaces/props/displayers.props';
import { createAppointment } from '@services/appointment.service';
import React, {
    FC, useEffect, useState,
} from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const StepsToCreate: FC<StepsProps> = ({ order, title, subtitle }) => (
    <div className="my-4">
        <span className="badge badge-primary badge-lg">
            Paso
            {' '}
            {order}
        </span>
        <h1 className="font-bold text-lg">{title}</h1>
        <h2 className="">{subtitle}</h2>
    </div>
);

const CreateAppointment: FC = () => {
    const navigate = useNavigate();
    const { isLoading, mutateAsync } = useMutation((params: any) => createAppointment(params));
    const [globalLoading, setIsLoading] = useState(false);
    const [doctor, setDoctor] = useState<Doctor>();
    const [date, setDate] = useState<Date>();
    const [hour, setHour] = useState<string>('');
    const [clinic, setClinic] = useState<Clinic>();

    const doctorUnmounter = () => {
        setDate(undefined);
        setDoctor(undefined);
        setHour('');
    };

    useEffect(() => {
        if (doctor) document.getElementById('section-date')?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
    }, [doctor]);

    useEffect(() => {
        if (date) document.getElementById('section-hour')?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
    }, [date]);

    useEffect(() => {
        if (hour) document.getElementById('section-clinic')?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
    }, [hour]);

    useEffect(() => {
        if (clinic) document.getElementById('section-create')?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
    }, [clinic]);

    const onClick = async () => {
        const fullDate = new Date(`${new Date(date as Date).toDateString()} ${hour}`);

        if (doctor != null && clinic != null) {
            await mutateAsync({ doctorId: doctor?.email, centerId: clinic?.id, date: fullDate });
            toast.success('Cita creada');
            navigate('/home');
        } else {
            toast.error('Debes llenar todos los campos');
        }
    };

    return (
        <Layout hasMenu isLoading={globalLoading || isLoading}>
            <Header title="De acuerdo, creemos una cita" subtitle="Vamos paso a paso 👣" />
            <div className="centered-xy flex-col h-auto space-y-10 pb-24">
                <div className="w-full" id="section-doctor">
                    <StepsToCreate order={1} title="Escoge un doctor" subtitle="Cualquiera de la lista ✏️" />
                    <DoctorsDisplayer
                        setIsLoading={setIsLoading}
                        action={setDoctor}
                        unmounter={doctorUnmounter}
                    />
                </div>
                {
                    doctor != null && (
                        <div className="w-full" id="section-date">
                            <StepsToCreate order={2} title="Escoge un día" subtitle="Luego te mostraremos los horarios 📅" />
                            <DatePickerDisplayer action={setDate} />
                        </div>
                    )
                }
                {
                    doctor != null && date != null && (
                        <div className="w-full" id="section-hour">
                            <StepsToCreate order={3} title="Ahora selecciona una hora" subtitle="Acá tienes los horarios disponibles de tu doctor ⌚" />
                            <HourPickerDisplayer
                                date={date}
                                email={doctor.email}
                                action={setHour}
                                setIsLoading={setIsLoading}
                            />
                        </div>
                    )
                }
                {
                    doctor != null && date != null && hour != null && hour !== '' && doctor.clinics != null
                    && doctor.clinics.length > 0 && (
                        <div className="w-full" id="section-clinic">
                            <StepsToCreate order={4} title="Finalmente, selecciona un consultorio" subtitle="Casi terminamos 🗺️" />
                            <ClinicsDisplayer clinics={doctor.clinics} action={setClinic} />
                        </div>
                    )
                }
                {
                    doctor != null && date != null && hour != null && hour !== '' && clinic && (
                        <div id="section-create">
                            <button onClick={onClick} type="button" className="btn btn-primary">Agendar</button>
                        </div>
                    )
                }
            </div>
        </Layout>
    );
};

export default CreateAppointment;
