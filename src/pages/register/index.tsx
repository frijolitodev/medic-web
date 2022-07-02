import { Link, useNavigate } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import { IRegister } from '@interfaces/auth/register.interface';
import Layout from '@components/layout';
import TextInput from '@components/inputs';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@context/authContext';
import { useForm } from 'react-hook-form';

const Register: FC = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/home', { replace: true });
    }, [user, navigate]);

    const { register, formState: { errors }, handleSubmit } = useForm<IRegister>({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            lastName: '',
            age: undefined,
            phone: '',
            role: "patient",
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
        age: {
            required: {
                value: true,
                message: 'Age cannot be empty',
            },
        },
    };

    const submitHandler = async (data: IRegister) => {
        login(data);
    };

    if (user) return null;

    return (
        <Layout>
            <div className="max-w-screen-md h-screen flex items-center justify-center mx-auto">
                <Toaster position="bottom-center" />
                <form onSubmit={handleSubmit(submitHandler)} className="w-full form-control px-12 lg:px-32">
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
                    <div className="flex space-x-4 w-full">
                        <TextInput
                            label="Telefono"
                            placeholder="xxxx-xxxx"
                            inputProps={register('phone', inputRules.phone)}
                            errors={errors?.phone?.message}
                        />
                        <span className="w-1/4">
                            <TextInput
                                label="Edad"
                                placeholder="18"
                                inputProps={register('age', inputRules.age)}
                                errors={errors?.age?.message}
                            />
                        </span>
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
                    <div class="form-control">
                        <label class="cursor-pointer label">
                            <span class="label-text">Remember me</span>
                            <input type="checkbox" class="checkbox checkbox-sm checkbox-accent" />
                        </label>
                    </div>
                    <Link className="ml-auto text-slate-400 font-semibold underline italic -mt-2 hover:text-accent" to="/register">
                        Ya tienes cuenta? Inicia sesíon.
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
