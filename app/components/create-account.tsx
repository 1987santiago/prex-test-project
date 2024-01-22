import { FormEvent } from "react";

export default function CreateAccountComponent({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Create Account</legend>
                <div>
                    <label htmlFor='email'>Email address:</label>
                    <input type='email' pattern="[\w]{3,}@[a-z]{3,}\.com" name='email' id='email' required />
                </div>
                <div>
                    <label htmlFor='pass'>Pass:</label>
                    <input type='password' name='password' id='pass' required />
                </div>
                <input type="submit" value="Create" />
            </fieldset>
        </form>
    );
}