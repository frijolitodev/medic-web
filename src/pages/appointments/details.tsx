// @ts-nocheck
import Header from '@components/header';
import gmaps from '@components/helpers/gmaps';
import Layout from '@components/layout';
import { Map, Marker } from '@components/map';
import { Wrapper } from '@googlemaps/react-wrapper';
import { deleteAppointment, getById } from '@services/appointment.service';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { longDateTimeFormat } from 'src/constants/time';

const AppointmentDetails: FC = () => {
    const { aptId } = useParams();
    const navigate = useNavigate();
    const {
        data: apt, isLoading, isError,
    } = useQuery('apt', () => getById(+aptId!));
    const { mutateAsync, isLoading: isDeleting } = useMutation(() => deleteAppointment(aptId));

    const [zoom, setZoom] = useState<number>(15);
    const [center, setCenter] = useState<google.maps.LatLngLiteral>();

    const onIdle = (m: google.maps.Map) => {
        if (m) {
            setZoom(m.getZoom()!);
            setCenter(m.getCenter()!.toJSON());
        }
    };

    useEffect(() => {
        if (apt && apt.clinic) {
            setCenter({
                lat: Number(apt.clinic.location.latitude),
                lng: Number(apt.clinic.location.longitude),
            });
        }
    }, [apt]);

    const submitCancel = async () => {
        const res = await mutateAsync();

        if (res) {
            toast.success('Se ha eliminado tu cita');
            navigate('/home');
        }
    };

    if (isError) {
        toast.error('Esta cita ya ha sido eliminada', { id: 'NO-APPOINTMENT' });

        navigate('/home');
    }

    return (
        <Layout hasMenu isLoading={isLoading || isDeleting}>
            {
                !isLoading && (
                    <>
                        <div className="w-full">
                            <Header title="Veamos los detalles de tu cita" subtitle="Y si quieres puedes eliminarla ⛔" />
                        </div>
                        <div className="centered-xy flex-col space-y-4 pb-20">
                            <figure className="w-48 h-48 bg-white rounded-full border-4 border-accent centered-xy">
                                <img className="rounded-full" src={apt?.doctor?.profileImage} alt={apt?.doctor?.fullName} />
                            </figure>
                            <h1 className="text-center">
                                Tu cita es con
                                {' '}
                                <span className="font-medium">{ apt.doctor.fullName }</span>
                                {' '}
                                el día
                                {' '}
                                <span className="font-medium">{ new Date(apt.date).toLocaleDateString('es-sv', longDateTimeFormat) }</span>
                                {' '}
                                a las
                                {' '}
                                <span className="font-medium">{ new Date(apt.date).toLocaleTimeString('es-sv') }</span>
                                {' '}
                            </h1>
                            <div className="w-full text-center space-y-2">
                                <h1 className="font-medium">Puedes ver la ubicación aquí </h1>
                                <div className="rounded-lg w-full">
                                    <Wrapper apiKey={import.meta.env.VITE_MAPS_API_KEY}>
                                        <Map
                                            center={center}
                                            zoom={zoom}
                                            onIdle={onIdle}
                                            className="h-96 w-full rounded-lg"
                                        >
                                            <Marker position={center} />
                                        </Map>
                                    </Wrapper>
                                </div>
                                <a
                                    className="btn btn-accent"
                                    href={
                                        gmaps(
                                            apt.clinic.location.latitude,
                                            apt.clinic.location.longitude,
                                        )
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Ver en Google Maps
                                </a>
                            </div>
                            <button onClick={submitCancel} type="button" className="btn btn-warning">
                                Cancelar cita
                            </button>
                        </div>
                    </>
                )
            }
        </Layout>
    );
};

export default AppointmentDetails;
