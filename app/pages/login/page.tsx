'use client';

const Login = () => {

    const getUsers = async () => {
        const response = await fetch('/api/users');
        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            Login Page
            <button onClick={getUsers}>Get Users</button>
        </>
    );
};

export default Login;