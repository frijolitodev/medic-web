/* eslint-disable consistent-return */
import { Link, useNavigate } from 'react-router-dom';
import React, {
    FC, useEffect, useRef, useState,
} from 'react';
import { Register as IRegister } from '@interfaces/auth/register.interface';
import Layout from '@components/layout';
import { TextInput, DateInput } from '@components/inputs';
import { useAuth } from '@context/authContext';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { register as apiRegister } from '@services/auth.service';
import Header from '@components/header';
import toast from 'react-hot-toast';
import registerRules from 'src/rules/register.rules';

const Register: FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { isLoading, mutateAsync } = useMutation((data: any) => apiRegister(data));
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | undefined>();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if (user) navigate('/home', { replace: true });
    }, [user, navigate]);

    const { register, formState: { errors }, handleSubmit } = useForm<IRegister>({
        defaultValues: {
            img: undefined,
            email: '',
            password: '',
            name: '',
            lastName: '',
            dateOfBirth: undefined,
            phone: '',
        },
    });

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    const submitHandler = async (data: IRegister) => {
        const formData = new FormData();
        const role = 'patient';

        formData.append('role', role);

        if (data.img.length > 0) formData.append('img', data.img[0]);

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await mutateAsync(formData);
        toast.success('Ahora inicia sesión');
        navigate('/login', { replace: true });
    };

    if (user) return null;

    return (
        <Layout isLoading={isLoading}>
            <div className="max-w-screen-md min-h-screen flex flex-col items-center justify-center mx-auto px-12 py-10 lg:px-32">
                <Header title="Vamos a registrarte" subtitle="Por favor, completa con tu información 📝" />
                <form onSubmit={handleSubmit(submitHandler)} className="w-full form-control">
                    <div className="form-control pb-6">
                        <figure className="text-center mx-auto p-4">
                            {
                                preview
                                    ? <img src={preview} alt="profile" className="w-32 h-32 rounded-full border-4 border-accent" />
                                    : <div className="w-32 h-32 bg-slate-400 rounded-full border-4 border-accent" />
                            }
                        </figure>
                        <label className="label" htmlFor="img">
                            <span className="label-text text-base font-medium">Imagen de perfil</span>
                        </label>
                        <input
                            className="block w-full text-sm rounded-lg input input-bordered input-accent cursor-pointer input-md px-0
                            file:mr-5 file:py-2 file:px-3 file:border-0 file:font-medium file:h-full file:rounded-l-lg file:bg-slate-700 file:text-accent"
                            type="file"
                            {...register('img')}
                            onChange={onSelectFile}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <TextInput
                            label="Nombre"
                            placeholder="John"
                            inputProps={register('name', registerRules.name)}
                            errors={errors?.name?.message}
                        />
                        <TextInput
                            label="Apellido"
                            placeholder="Doe"
                            inputProps={register('lastName', registerRules.lastName)}
                            errors={errors?.lastName?.message}
                        />
                    </div>
                    <div className="flex w-full flex-wrap lg:flex-nowrap lg:space-x-4">
                        <span className="w-full">
                            <TextInput
                                label="Telefono"
                                placeholder="xxxx-xxxx"
                                inputProps={register('phone', registerRules.phone)}
                                errors={errors?.phone?.message}
                            />
                        </span>
                        <DateInput
                            label="Fecha de nacimiento"
                            inputProps={register('dateOfBirth', {
                                required: true,
                            })}
                            errors={errors?.dateOfBirth?.message}
                        />
                    </div>
                    <TextInput
                        label="Correo electrónico"
                        placeholder="example@email.com"
                        inputProps={register('email', registerRules.email)}
                        errors={errors?.email?.message}
                    />
                    <TextInput
                        label="Contraseña"
                        placeholder="********************"
                        inputProps={register('password', registerRules.password)}
                        errors={errors?.password?.message}
                        isPassword
                    />
                    <Link className="ml-auto text-slate-400 font-semibold underline italic -mt-2 hover:text-accent" to="/login">
                        ¿Ya tienes cuenta? Inicia sesíon.
                    </Link>
                    <button className="btn btn-accent w-1/2 ml-auto mt-4" type="submit">
                        Regístrate
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
