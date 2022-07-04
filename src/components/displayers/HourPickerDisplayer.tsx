import { RadioInput } from '@components/inputs';
import { ExclamationIcon } from '@heroicons/react/solid';
import { HourPicker, HourPickerProps } from '@interfaces/props/displayers.props';
import { Availability } from '@interfaces/timemeasures/availability.interface';
import { getAvailability } from '@services/doctor.service';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

const HourPickerDisplayer: FC<HourPickerProps<string>> = ({
    date, email, action, setIsLoading,
}) => {
    const { data, isLoading } = useQuery('dr-availability', () => getAvailability(email, date as string));

    useEffect(() => {
        setIsLoading!(isLoading);
    }, [isLoading, setIsLoading]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        action(value);
    };

    return (
        data && data.length > 0
            ? (
                <div>
                    <RadioInput name="hour" onChange={onChange} elements={data} />
                </div>
            )
            : (
                <div className="alert alert-warning shadow-lg">
                    <div>
                        <ExclamationIcon xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" />
                        <span>Este doctor no tiene ningun horario disponible en esta fecha</span>
                    </div>
                </div>
            )
    );
};

export default HourPickerDisplayer;
