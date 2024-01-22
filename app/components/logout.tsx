'use client';

export default function LogoutComponent({ onSubmit }: { onSubmit: Function }) {

    return (<input type="submit" onClick={() => onSubmit()} value="Logout" />);
}