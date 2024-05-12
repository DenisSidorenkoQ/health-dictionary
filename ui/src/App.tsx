import 'devextreme/dist/css/dx.light.css';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import JournalLayout from "./components/JournalLayout";
import {useSessionStore} from "./store";
import LoadingScreen from "./components/LoadingScreen";
import UserMenuPage from "./pages/MenuPage/UserMenuPage";
import UserProfilePage from "./pages/ProfilePage/UserProfilePage";
import RegistrationPage from "./pages/LoginPage/RegistrationPage";

function App() {
    const user = useSessionStore(state => state.user);
    const loading = useSessionStore(state => state.loading);

    const getSession = useSessionStore(state => state.getSession);

    useEffect(() => {
        getSession();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    if (user?.roleName === 'USER') {
        return (
            <JournalLayout>
                <Routes>
                    <Route path={'/login'} element={<LoginPage />} />
                    <Route path={'/menu'} element={<UserMenuPage />} />
                    <Route path={'/profile'} element={<UserProfilePage />} />
                    <Route path={'*'} element={<Navigate to="/menu" replace />} />
                </Routes>
            </JournalLayout>
        );
    }

    return (
        <Routes>
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/registration'} element={<RegistrationPage />} />
            <Route path={'*'} element={<Navigate to="/login" replace />} />
        </Routes>

    );
}

export default App;
