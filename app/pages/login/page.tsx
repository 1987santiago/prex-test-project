'use client'

import React, { useState } from 'react'
import LoginComponent from "@/app/components/login";
import LogoutComponent from "@/app/components/logout";
import { UserDataProps } from "@/types";
import { ROUTES, USER } from "@/constants";
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Login = () => {
    const [user, setUser] = useState(global?.localStorage?.getItem(USER.ACTIVE));

    if (user) {
        window.location.replace(window.location.origin);
    }

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

        const responseData = await response.json();
        const usersList = JSON.parse(responseData);
        const userAuth: UserDataProps = usersList.find((user: UserDataProps) => user.name === username);

        if (!userAuth || userAuth.password !== password) {
            console.log('401 - Vos no pasas');
            return;
        }

        setUser(userAuth.name);
        localStorage.setItem(USER.ACTIVE, userAuth.name);
        persistUserData(userAuth);
        window.location.replace(window.location.origin);
    };

    const persistUserData = async (user: UserDataProps) => {
        await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(user)
        });
    };

    if (user) {
        return (
            <h4>Bienvenido {user}!</h4>
        );
    }

    return (
        <LoginComponent onSubmit={onSubmit} />
    );
};

export default dynamic(() => Promise.resolve(Login), {
    ssr: false,
});