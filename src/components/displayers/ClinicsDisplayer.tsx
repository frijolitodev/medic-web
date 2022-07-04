import { ClinicAsMap } from '@components/clinics';
import { Clinic } from '@interfaces/doctor/clinic.interface';
import { ClinicsDisplayerProps } from '@interfaces/props/displayers.props';
import React, {
    FC, useEffect, useId, useState,
} from 'react';

const ClinicsDisplayer: FC<ClinicsDisplayerProps<Clinic | undefined>> = ({
    clinics, action, unmounter,
}) => {
    const id = useId();
    const [displayClinics, setDisplayClinics] = useState(clinics);
    const [selected, setSelected] = useState<Clinic>();

    const onSelect = (clinic: Clinic) => {
        setSelected(clinic);
        setDisplayClinics([clinics.find((cl) => cl.id === clinic.id) as Clinic]);
    };

    const onUnselect = () => {
        if (unmounter) unmounter();
        setDisplayClinics(clinics);
        setSelected(undefined);
    };

    useEffect(() => {
        action(selected as Clinic);
    }, [selected, action]);

    return (
        <div className="centered-xy flex-col w-full space-y-10 lg:space-y-0">
            {
                displayClinics.map((clinic, index) => (
                    <ClinicAsMap
                        key={`${id}-${index}`}
                        clinic={clinic}
                        onSelect={() => onSelect(clinic)}
                        onUnselect={onUnselect}
                        isSelected={clinic.id === selected?.id}
                    />
                ))
            }
        </div>
    );
};

export default ClinicsDisplayer;
