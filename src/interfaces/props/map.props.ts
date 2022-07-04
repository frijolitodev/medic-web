import { ExtendedProps } from './extended.props';

export interface MapProps extends ExtendedProps {
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    options?: any;
}
