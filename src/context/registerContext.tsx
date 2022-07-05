// @ts-nocheck
import { Clinic } from '@interfaces/doctor/clinic.interface';
import { Experience } from '@interfaces/doctor/experience.interface';
import { Formation } from '@interfaces/doctor/formation.interface';
import { ScheduleForRegister } from '@interfaces/timemeasures/schedule.interface';
import React, {
    createContext, FC, PropsWithChildren, useContext, useMemo, useState, Dispatch, SetStateAction,
} from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

interface RegisterContextType {
    submitSchedule?: UseFormHandleSubmit<ScheduleForRegister>;
    setSubmitSchedule: Dispatch<SetStateAction<UseFormHandleSubmit<ScheduleForRegister>>>;
    isScheduleValid: boolean;
    setIsScheduleValid: Dispatch<SetStateAction<boolean>>;

    submitFormation: UseFormHandleSubmit<Formation[]>;
    setSubmitFormation: Dispatch<SetStateAction<UseFormHandleSubmit<Formation[]>>>;
    isFormationValid: boolean;
    setIsFormationValid: Dispatch<SetStateAction<boolean>>;

    submitExperience: UseFormHandleSubmit<Experience[]>;
    setSubmitExperience: Dispatch<SetStateAction<UseFormHandleSubmit<Experience[]>>>;
    isExperienceValid: boolean;
    setIsExperienceValid: Dispatch<SetStateAction<boolean>>;

    submitClinics: UseFormHandleSubmit<Clinic[]>;
    setSubmitClinics: Dispatch<SetStateAction<UseFormHandleSubmit<Clinic[]>>>;
    isClinicsValid: boolean;
    setIsClinicsValid: Dispatch<SetStateAction<boolean>>;
}

export const RegisterContext = createContext<RegisterContextType>({} as RegisterContextType);

export const useRegister = () => useContext(RegisterContext);

export const RegisterProvider: FC<PropsWithChildren> = ({ children }) => {
    // eslint-disable-next-line max-len
    const [submitSchedule, setSubmitSchedule] = useState<UseFormHandleSubmit<ScheduleForRegister>>();
    const [isScheduleValid, setIsScheduleValid] = useState(false);

    const [submitFormation, setSubmitFormation] = useState<UseFormHandleSubmit<Formation[]>>();
    const [isFormationValid, setIsFormationValid] = useState(false);

    const [submitExperience, setSubmitExperience] = useState<UseFormHandleSubmit<Experience[]>>();
    const [isExperienceValid, setIsExperienceValid] = useState(false);

    const [submitClinics, setSubmitClinics] = useState<UseFormHandleSubmit<Clinic[]>>();
    const [isClinicsValid, setIsClinicsValid] = useState(false);

    const memoizedValuesForProvider = useMemo(() => ({
        submitSchedule,
        setSubmitSchedule,
        isScheduleValid,
        setIsScheduleValid,

        submitFormation,
        setSubmitFormation,
        isFormationValid,
        setIsFormationValid,

        submitExperience,
        setSubmitExperience,
        isExperienceValid,
        setIsExperienceValid,

        submitClinics,
        setSubmitClinics,
        isClinicsValid,
        setIsClinicsValid,
    }), [
        submitSchedule,
        submitFormation,
        submitExperience,
        submitClinics,
        isScheduleValid,
        isFormationValid,
        isExperienceValid,
        isClinicsValid,
    ]);

    return (
        <RegisterContext.Provider value={memoizedValuesForProvider}>
            {children}
        </RegisterContext.Provider>
    );
};
