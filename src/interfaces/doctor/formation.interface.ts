import { Identifiable } from '@interfaces/common/identifiable.interface';

export interface Formation extends Identifiable {
    title: string;
    location: string;
    startedAt: Date;
    endedAt: Date;
}
