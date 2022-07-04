import { Identifiable } from '@interfaces/common/identifiable.interface';

export interface Experience extends Identifiable {
    title: string;
    location: string;
    startedAt: Date;
    endedAt: Date;
}
