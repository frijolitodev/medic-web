import Spinner from '@components/spinner';
import { ILogin } from '@interfaces/auth/login.interface';
import { login, me } from '@services/auth.service';
import React, {
    useEffect, createContext, FC, PropsWithChildren, useState, useMemo, useCallback, Suspense,
} from 'react';
import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user?: any;
    loading: boolean;
    error?: any;
    login: (data: ILogin) => void;
    logout: () => void;
}

export interface User {
    token: string;
    role: string;
    fullName: string;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);

    const { isLoading, error, mutateAsync } = useMutation((params: ILogin) => login(params));
    const {
        isLoading: isLoadingMe,
        error: errorMe,
        mutateAsync: mutateAsyncMe,
    } = useMutation(me);

    const fetchFromCookie = useCallback(async () => {
        const userFromApi = await mutateAsyncMe();
        setUser(userFromApi);
    }, [mutateAsyncMe]);

    useEffect(() => {
        // Token is preset but not user info
        if (cookies['auth-token'] && user === undefined) fetchFromCookie();
    }, [cookies, fetchFromCookie, navigate, user]);

    const loginHandler = useCallback(async (data: ILogin) => {
        const { token } = await mutateAsync(data);

        setCookie('auth-token', token);

        await fetchFromCookie();

        navigate('/home', { replace: true });
    }, [mutateAsync, navigate, setCookie, fetchFromCookie]);

    const logoutHandler = useCallback(() => removeCookie('auth-token'), [removeCookie]);

    const memoizedForProvider = useMemo(
        () => ({
            user,
            login: loginHandler,
            logout: logoutHandler,
            loading: isLoading || isLoadingMe,
            error: error || errorMe,
        }),
        [user, loginHandler, logoutHandler, isLoading, isLoadingMe, error, errorMe],
    );

    return (
        <AuthContext.Provider value={memoizedForProvider}>
            <Suspense fallback={<Spinner />}>
                { !user ? null : children }
            </Suspense>
        </AuthContext.Provider>
    );
};
