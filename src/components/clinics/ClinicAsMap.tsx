import { Marker, Map } from '@components/map';
import { Wrapper } from '@googlemaps/react-wrapper';
import { ClinicAsMapProps } from '@interfaces/props/displayers.props';
import classNames from 'classnames';
import React, { FC, useMemo, useState } from 'react';

const ClinicAsMap: FC<ClinicAsMapProps> = ({
    clinic, isSelected, onSelect, onUnselect,
}) => {
    const memoizedSelect = useMemo(() => isSelected, [isSelected]);

    const [zoom, setZoom] = useState<number>(15);
    const [center, setCenter] = useState<google.maps.LatLngLiteral>(
        { lat: Number(clinic.location.latitude), lng: Number(clinic.location.longitude) },
    );

    const onIdle = (m: google.maps.Map) => {
        if (m) {
            setZoom(m.getZoom()!);
            setCenter(m.getCenter()!.toJSON());
        }
    };

    return (
        <div className={classNames('card card-compact w-full bg-slate-600', { 'bg-primary': memoizedSelect, 'text-primary-content': memoizedSelect })}>
            <figure>
                <Wrapper apiKey={import.meta.env.VITE_MAPS_API_KEY}>
                    <Map
                        center={center}
                        zoom={zoom}
                        onIdle={onIdle}
                        className="h-96 w-full lg:w-1/3 lg:m-4"
                    >
                        <Marker position={center} />
                    </Map>
                </Wrapper>
            </figure>
            <div className="card-body">
                <h1 className="card-title">{clinic.name}</h1>
                <div className="card-actions justify-end">
                    <button
                        onClick={isSelected ? onUnselect : onSelect}
                        type="button"
                        className="btn btn-accent"
                    >
                        {isSelected ? 'Deseleccionar' : 'Seleccionar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClinicAsMap;
