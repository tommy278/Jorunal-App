"use client";

import { useAuth } from '@/context/AuthContext';

export default function Home() {
    const { logout } = useAuth();

    async function handleLogout() {
        await logout();
        window.location.href = '/login';
    }
    return(
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}