// src/App.tsx
import React, { useState } from 'react';
import Login from './components/Login/Login';
import NewsList from './components/Login/News/NewList';
import AddNews from './components/Login/News/AddNews';
const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <div>
            <header>
                <h1>Application de News</h1>
                {isAuthenticated && <button onClick={handleLogout}>Déconnexion</button>}
            </header>
            <main>
                {isAuthenticated ? (
                    <>
                        <AddNews />
                        <NewsList />
                    </>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </main>
        </div>
    );
};

export default App;
