import React, { FC, useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IRadioInputProps {
    elements: any[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

const RadioInput: FC<IRadioInputProps> = ({
    elements, onChange, name,
}) => {
    const id = useId();

    return (
        <div className="w-full pb-3 transition-all relative">
            {/* Wrapper */}
            <div className="form-control">
                {
                    elements && elements.length > 0 && elements.map((ig, idx) => (
                        <label key={`${id}-${idx}`} className="w-full label cursor-pointer">
                            <span className="label-text text-base font-medium">{ig.time}</span>
                            <input
                                className="radio checked:bg-accent"
                                type="radio"
                                value={ig.time}
                                name={name}
                                onChange={onChange}
                            />
                        </label>
                    ))
                }
            </div>
        </div>
    );
}

export default RadioInput;
