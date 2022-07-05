import Layout from '@components/layout';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Landing: FC = () => (
    <div>
        <div
            className="relative hero min-h-screen bg-base-200"
            style={{ backgroundImage: 'url(/src/img/hero-bg.jpg)' }}
        >
            <div className="hero-overlay bg-opacity-80" />
            <div className="absolute top-0 w-full flex justify-between p-4">
                <Link className="btn btn-accent" to="/login">Inicia sesión</Link>
                <Link className="btn btn-accent" to="/register">Regístrate</Link>
            </div>
            <div className="hero-content text-center px-10">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold lg:text-6xl">Medic App</h1>
                    <p className="py-6 text-lg lg:text-2xl">
                        Busca y agenda citas médicas con doctors cerca de ti, todo online 📅
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Landing;
