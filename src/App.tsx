import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '@pages/login';
import Home from '@pages/home';
import { AuthProvider } from '@context/authContext';
import RequireAuth from '@components/auth/RequireAuth';

const App = () => (
    <AuthProvider>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/home"
                element={(
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                )}
            />
        </Routes>
    </AuthProvider>
);

export default App;
