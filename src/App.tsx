import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '@pages/login';
import Home from '@pages/home';
import Landing from '@pages/landing';
import { AuthProvider } from '@context/authContext';
import RequireAuth from '@components/auth';
import Register from '@pages/register';
import CreateAppointment from '@pages/appointments/create';
import AppointmentDetails from '@pages/appointments/details';

const App = () => (
    <AuthProvider>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/home"
                element={(
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                )}
            />
            <Route
                path="/appointments"
                element={(
                    <RequireAuth>
                        <CreateAppointment />
                    </RequireAuth>
                )}
            />
            <Route
                path="/appointments/:aptId"
                element={(
                    <RequireAuth>
                        <AppointmentDetails />
                    </RequireAuth>
                )}
            />
        </Routes>
    </AuthProvider>
);

export default App;
