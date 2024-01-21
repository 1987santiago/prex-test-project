'use client';

export default function LogoutComponent({ onSubmit }: { onSubmit: Function }) {

    return (
        <div>
            <input type="submit" onClick={() => onSubmit()} value="Logout" />
        </div>
    );
}