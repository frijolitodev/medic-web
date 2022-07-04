import { User } from '@interfaces/auth/identity.interface';
import { ILogin } from '@interfaces/auth/login.interface';
import { login } from '@services/auth.service';
import React, {
    useEffect, createContext, FC, PropsWithChildren, useState, useMemo, useCallback,
} from 'react';
import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthContextType {
    user?: User;
    loading: boolean;
    error?: any;
    login: (data: ILogin) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => React.useContext<AuthContextType>(AuthContext);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | undefined>(undefined);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const { isLoading, error, mutateAsync } = useMutation((params: ILogin) => login(params));

    useEffect(() => {
        setUser(cookies.user);
    }, [cookies, navigate]);

    const loginHandler = useCallback(async (data: ILogin) => {
        const userInfo = await mutateAsync(data);

        setCookie('user', userInfo);
        setUser(userInfo);

        navigate('/home', { replace: true });
    }, [mutateAsync, navigate, setCookie]);

    const logoutHandler = useCallback(() => removeCookie('user'), [removeCookie]);

    const memoizedForProvider = useMemo(
        () => ({
            user,
            login: loginHandler,
            logout: logoutHandler,
            loading: isLoading,
            error,
        }),
        [user, loginHandler, logoutHandler, isLoading, error],
    );

    return (
        <AuthContext.Provider value={memoizedForProvider}>
            {children}
        </AuthContext.Provider>
    );
};
