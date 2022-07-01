import React, { FC, useEffect } from 'react';
import { ILogin } from '@interfaces/auth/login.interface';
import Layout from '@components/layout';
import TextInput from '@components/inputs';
import { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/authContext';

const Login: FC = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/home', { replace: true });
    }, [user, navigate]);

    const { register, formState: { errors }, handleSubmit } = useForm<ILogin>({
        defaultValues: {
            email: '',
            password: '',
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
    };

    const submitHandler = async (data: ILogin) => {
        login(data);
    };

    if (!user) return null;

    return (
        <Layout>
            <div className="max-w-screen-sm h-screen flex items-center justify-center mx-auto">
                <Toaster position="bottom-center" />
                <form onSubmit={handleSubmit(submitHandler)} className="w-full form-control px-12 lg:px-32">
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
                    <Link className="ml-auto text-slate-400 font-semibold underline italic -mt-2 hover:text-accent" to="/register">
                        Regístrate
                    </Link>
                    <button className="btn btn-accent w-1/2 ml-auto mt-4" type="submit">
                        Inicia sesión
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
