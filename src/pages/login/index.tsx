import React, { FC, useEffect } from 'react';
import { ILogin } from '@interfaces/auth/login.interface';
import Layout from '@components/layout';
import { TextInput } from '@components/inputs';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/authContext';
import Header from '@components/header';
import loginRules from 'src/rules/login.rules';

const Login: FC = () => {
    const { state: prevFromRouter } = useLocation();
    const { user, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (prevFromRouter) {
                const prevRoute = (prevFromRouter as any).location.pathname;
                navigate(prevRoute, { replace: true });
            } else navigate('/home', { replace: true });
        }
    }, [user, navigate, prevFromRouter]);

    const { register, formState: { errors }, handleSubmit } = useForm<ILogin>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const submitHandler = async (data: ILogin) => {
        login(data);
    };

    if (user) return null;

    return (
        <Layout>
            <div className="max-w-screen-sm h-screen flex flex-col items-center justify-center mx-auto px-12 lg:px-32">
                <Header title="Bienvenido" subtitle="Que bueno verte de nuevo 🥳" />
                <form onSubmit={handleSubmit(submitHandler)} className="w-full form-control">
                    <TextInput
                        label="Correo electrónico"
                        placeholder="example@email.com"
                        inputProps={register('email', loginRules.email)}
                        errors={errors?.email?.message}
                    />
                    <TextInput
                        label="Contraseña"
                        placeholder="********************"
                        inputProps={register('password', loginRules.password)}
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
