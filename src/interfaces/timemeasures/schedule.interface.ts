import { Identifiable } from '@interfaces/common/identifiable.interface';
import { Workday } from './workday.interface';

export interface Schedule extends Identifiable {
    availability: Workday;
}
