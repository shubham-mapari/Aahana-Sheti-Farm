import React, { useEffect } from 'react';
import { HashRouter, useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import AppRoutes from './routes/AppRoutes';

function BackButtonHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const backHandler = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
            if (location.pathname === '/') {
                // If on home page, exit the app
                CapacitorApp.exitApp();
            } else {
                // Otherwise go back to previous page in history
                navigate(-1);
            }
        });

        return () => {
            backHandler.remove();
        };
    }, [location, navigate]);

    return <AppRoutes />;
}

function App() {
    return (
        <HashRouter>
            <BackButtonHandler />
        </HashRouter>
    );
}

export default App;
