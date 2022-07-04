import { DateInput } from '@components/inputs';
import { WithDispatchProps, DatePicker } from '@interfaces/props/displayers.props';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

const DatePickerDisplayer: FC<WithDispatchProps<Date | undefined>> = ({ action }) => {
    const { register, formState: { errors }, handleSubmit } = useForm<DatePicker>({
        defaultValues: {
            date: undefined,
        },
    });

    const onSubmit = (data: DatePicker) => {
        action(data.date as Date);
    };

    return (
        <form onChange={handleSubmit(onSubmit)}>
            <DateInput
                label="Fecha"
                inputProps={register('date', {
                    required: true,
                    valueAsDate: true,
                    validate: (value) => (value instanceof Date && value > new Date()) || 'Debes seleccionar una fecha posterior',
                })}
                errors={errors.date?.message}
            />
        </form>
    );
};

export default DatePickerDisplayer;
