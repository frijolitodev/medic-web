import { Doctor } from '@interfaces/doctor/doctor.interface';
import React, { FC, useMemo } from 'react';
import CardBase from './CardBase';

const MedicCard: FC<DoctorCardProps> = ({
    doctor, isSelected, onSelect, onUnselect,
}) => {
    const selectedMemo = useMemo(() => isSelected, [isSelected]);

    return (
        <CardBase className={selectedMemo ? 'bg-primary text-primary-content' : ''}>
            <figure>
                <img className="lg:w-48" src={doctor.profileImage} alt={doctor.fullName} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{doctor.fullName}</h2>
                <p className="">
                    {doctor.specialty ?? 'Medicina general'}
                </p>
                <div className="card-actions justify-end lg:absolute bottom-4 right-4">
                    {
                        isSelected && <button type="button" className="btn btn-accent" onClick={onUnselect}>Deseleccionar</button>
                    }
                    {
                        !isSelected && <button type="button" className="btn btn-accent" onClick={onSelect}>Seleccionar</button>
                    }
                </div>
            </div>
        </CardBase>
    );
};

export default MedicCard;
