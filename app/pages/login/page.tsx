'use client'

import React, { useState } from 'react'
import LoginComponent from "@/app/components/login";
import LogoutComponent from "@/app/components/logout";
import { UserDataProps } from "@/types";
import { USER } from "@/constants";

const Login = () => {
    const [user, setUser] = useState(localStorage.getItem(USER.ACTIVE));

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = event.currentTarget.querySelector('input[name=username]')?.value;
        const password = event.currentTarget.querySelector('input[type=password]')?.value;
        const response = await fetch('/api/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const responseData: string = await response.json();
        const usersList: Array<any> = JSON.parse(responseData);
        const userAuth: UserDataProps = usersList.find((user: UserDataProps) => user.name === username);

        if (!userAuth || userAuth.password !== password) {
            // Acceso denegado
            console.log('Vos no pasas');
            return;
        }

        setUser(userAuth.name);
        localStorage.setItem(USER.ACTIVE, userAuth.name);
    };

    if (user) {
        return (
            <>
                <h4>Bienvenido {user}!</h4>
                <LogoutComponent onSubmit={() => {
                    localStorage.clear();
                    setUser('');
                }} />
            </>
        );
    }

    return (
        <LoginComponent onSubmit={onSubmit} />
    );
};

export default Login;