/* eslint-disable consistent-return */
import { Link, useNavigate } from 'react-router-dom';
import React, {
    FC, useEffect, useRef, useState,
} from 'react';
import { IRegister } from '@interfaces/auth/register.interface';
import Layout from '@components/layout';
import { TextInput, DateInput } from '@components/inputs';
import { useAuth } from '@context/authContext';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { register as apiRegister } from '@services/auth.service';
import Header from '@components/header';
import toast from 'react-hot-toast';

const Register: FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const roleRef = useRef<HTMLInputElement>(null);
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

    const inputRules = {
        email: {
            required: {
                value: true,
                message: 'Email cannot be empty',
            },
            minLength: {
                value: 8,
                message: 'Email is at least 8 characters long',
            },
        },
        password: {
            required: {
                value: true,
                message: 'Password cannot be empty',
            },
            minLength: {
                value: 8,
                message: 'Password is at least 8 characters long',
            },
        },
        name: {
            required: {
                value: true,
                message: 'Name cannot be empty',
            },
        },
        lastName: {
            required: {
                value: true,
                message: 'Lastname cannot be empty',
            },
        },
        phone: {
            required: {
                value: true,
                message: 'Phone cannot be empty',
            },
            minLength: {
                value: 8,
                message: 'Phone is at least 8 characters long',
            },
        },
        dateOfBirth: {
            required: {
                value: true,
                message: 'Age cannot be empty',
            },
        },
    };

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    const submitHandler = async (data: IRegister) => {
        const formData = new FormData();
        const role = roleRef?.current?.checked ? 'doctor' : 'patient';

        if (role === 'doctor' && data.img.length <= 0) {
            toast.error('Los doctores deben registrarse con una imagen de perfil 😥');
            return;
        }

        formData.append('role', role);

        if (data.img.length > 0) formData.append('img', data.img[0]);

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        console.log(data.dateOfBirth);

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
                            inputProps={register('name', inputRules.name)}
                            errors={errors?.name?.message}
                        />
                        <TextInput
                            label="Apellido"
                            placeholder="Doe"
                            inputProps={register('lastName', inputRules.lastName)}
                            errors={errors?.lastName?.message}
                        />
                    </div>
                    <div className="flex w-full flex-wrap lg:flex-nowrap lg:space-x-4">
                        <span className="w-full">
                            <TextInput
                                label="Telefono"
                                placeholder="xxxx-xxxx"
                                inputProps={register('phone', inputRules.phone)}
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
                        inputProps={register('email', inputRules.email)}
                        errors={errors?.email?.message}
                    />
                    <TextInput
                        label="Contraseña"
                        placeholder="********************"
                        inputProps={register('password', inputRules.password)}
                        errors={errors?.password?.message}
                        isPassword
                    />
                    <div className="form-control pb-6">
                        <label className="cursor-pointer label">
                            <span className="label-text text-base font-medium">Soy doctor</span>
                            <input ref={roleRef} type="checkbox" className="checkbox checkbox-sm checkbox-accent" />
                        </label>
                    </div>
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
