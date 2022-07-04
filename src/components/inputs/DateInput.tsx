import React, { FC } from 'react';

import { ExclamationCircleIcon as Icon } from '@heroicons/react/solid';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IDateInputProps {
    inputProps: UseFormRegisterReturn;
    label: string;
    errors: string | undefined;
}

const DateInput: FC<IDateInputProps> = ({
    inputProps, label, errors,
}) => (
    <div className="w-full pb-6 transition-all relative">
        {/* Wrapper */}
        <div className="form-control flex flex-col justify-center items-start mb-1">
            <label className="label">
                <span className="label-text text-base font-medium">{ label }</span>
            </label>
            <input
                className="w-full input input-bordered input-accent input-md"
                type="date"
                {...inputProps}
            />
        </div>
        {
            errors && (
                <span className="absolute text-sm text-error inline-flex align-middle font-medium animate-pulse">
                    <Icon className="h-5 w-5 mr-1" />
                    {errors}
                </span>
            )
        }
    </div>
);

export default DateInput;
