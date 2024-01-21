import { FormEvent } from "react";

export default function LoginComponent({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Sign in</legend>
                <div>
                    <label htmlFor='username'>Usuario:</label>
                    <input type='text' name='username' id='username' />
                </div>
                <div>
                    <label htmlFor='pass'>Pass:</label>
                    <input type='password' name='password' id='pass' />
                </div>
                <input type="submit" value="Sign In" />
            </fieldset>
        </form>
    );
}