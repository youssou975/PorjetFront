// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/users/login', { login, password });
            const token = response.data.token;
            
            // Enregistrer le token dans le localStorage
            localStorage.setItem('token', token);

            // Appeler la fonction onLogin pour signaler que l'utilisateur est connecté
            onLogin();
        } catch (err) {
            setError('Login ou mot de passe incorrect.');
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Se connecter</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
