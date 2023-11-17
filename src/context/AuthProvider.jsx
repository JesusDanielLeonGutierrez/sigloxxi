
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { API_URL } from '../Config';



export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [auth, setAuth] = useState(false);

    const login = (email, password) => {
        setIsLoading(true);
        axios
            .post(API_URL + '/login', {
                email,
                password,
            })
            .then(res => {
                let tokenInfo = res.data.token;
                setToken(tokenInfo);
                localStorage.setItem('token', JSON.stringify(tokenInfo))
                setAuth(true);
            })
            .catch(e => {
                console.log(`login error ${e}`);
                window.location.replace('/');
            })
            .finally(() => {
                setIsLoading(false);
                window.location.replace('/');
            });
    };

    const isLoggedIn = async () => {
        try {
            let tokenValue;
            tokenValue = localStorage.getItem('token').replace(/['"]+/g, '');
            if (tokenValue) {
                setToken(tokenValue);
                setAuth(true);
            }
            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            setToken(null);
            setAuth(false);
            console.log(`is logged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                splashLoading,
                login,
                token,
                auth
            }}>
            {children}
        </AuthContext.Provider>
    );

}