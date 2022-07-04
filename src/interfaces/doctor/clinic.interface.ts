import { CustomGeolocation } from '@interfaces/common/geolocation.interface';
import { Identifiable } from '@interfaces/common/identifiable.interface';

export interface Clinic extends Identifiable {
    location: CustomGeolocation;
    name: string;
}
