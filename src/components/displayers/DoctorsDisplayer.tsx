import { DoctorCard } from '@components/cards';
import { Doctor } from '@interfaces/doctor/doctor.interface';
import { Pagination } from '@interfaces/paging/pagination.interface';
import { WithDispatchProps } from '@interfaces/props/displayers.props';
import { getAll } from '@services/doctor.service';
import React, {
    FC, useId, useState, useEffect,
} from 'react';
import { useQuery } from 'react-query';

const DoctorsDisplayer: FC<WithDispatchProps<Doctor | undefined>> = ({
    setIsLoading, action, unmounter,
}) => {
    const id = useId();
    const [selected, setSelected] = useState<Doctor>();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [paging, setPaging] = useState<Pagination>({ page: 1, limit: 1 });
    const { data, isLoading, refetch } = useQuery('apt-doctors', () => getAll(paging));

    useEffect(() => () => setDoctors([]), []);

    useEffect(() => setDoctors([]), []);

    useEffect(() => {
        refetch();
    }, [paging, refetch]);

    useEffect(() => {
        if (data && data.items) setDoctors((d) => [...d, ...data.items]);
    }, [data]);

    useEffect(() => {
        setIsLoading!(isLoading);
    }, [isLoading, setIsLoading]);

    useEffect(() => {
        action(selected as Doctor);
    }, [selected, action]);

    const onSelect = (dr: Doctor) => {
        setSelected(dr);
        setDoctors([doctors.find((it) => it.email === dr.email) as Doctor]);
    };

    const onUnselect = () => {
        unmounter!();
        setPaging({ page: 1, limit: 1 });
        setSelected(undefined);
        refetch();
    };

    return (
        <div className="centered-xy flex flex-wrap space-y-4 lg:flex-col">
            {
                doctors && doctors?.length > 0 && doctors?.map(
                    (dr, index) => (
                        <DoctorCard
                            key={`${id}-${index}`}
                            doctor={dr}
                            isSelected={selected != null && selected?.email === dr.email}
                            onSelect={() => onSelect(dr)}
                            onUnselect={onUnselect}
                        />
                    ),
                )
            }
            {
                selected == null && data && data.hasNextPage && (
                    <button type="button" className="btn btn-primary" onClick={() => setPaging((pg) => ({ ...pg, page: pg.page + 1 }))}>
                        Mostrar más
                    </button>
                )
            }
        </div>
    );
};

export default DoctorsDisplayer;
