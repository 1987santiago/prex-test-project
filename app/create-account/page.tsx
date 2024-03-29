'use client';

import CreateAccountComponent from "@/app/components/create-account";
import { ROUTES, USER } from "@/constants";
import { FormEvent } from "react"
import styles from './page.module.css';

export default function CreateAccount() {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = event.currentTarget.querySelector('input[type=email]')?.value;
        const password = event.currentTarget.querySelector('input[type=password]')?.value;
        const response = await fetch(ROUTES.API.USERS, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        });

        const responseData = await response.json();
        if (response.status === 201) {
            localStorage.setItem(USER.ACTIVE, email);
            await fetch(ROUTES.API.USER, {
                method: 'POST',
                body: JSON.stringify(responseData.user)
            });
            window.location.href = window.location.origin;
        }
    }

    return (
        <main className={styles.main}>
            <CreateAccountComponent onSubmit={onSubmit} />
        </main>
    );
}