import { Identifiable } from './identifiable.interface';

export interface CustomGeolocation extends Identifiable {
    latitude: string;
    longitude: string;
}
