import React, {
    Children,
    FC, useEffect, useRef, useState,
} from 'react';
import { MapProps } from '@interfaces/props/map.props';
import useDeepCompareEffectForMaps from '@hooks/useDeepCompareEffectForMaps';

const Map: FC<MapProps> = ({
    onClick, onIdle, className, children, ...options
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    useDeepCompareEffectForMaps(() => {
        if (map) map.setOptions(options);
    }, [map, options]);

    useEffect(() => {
        if (map) {
            ['click', 'idle'].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

            if (onClick) map.addListener('click', onClick);

            if (onIdle) map.addListener('idle', onIdle);
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} className={className} />
            {Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { map });
                }

                return null;
            })}
        </>
    );
};

export default Map;
