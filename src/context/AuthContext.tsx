"use client";

import { createContext, useState, useEffect, useContext } from 'react';

type User = { id: string; email: string } | null;

interface AuthContextProps {
    user: User;
    loading: boolean;
    login: (username: string, password: string ) => Promise<void>;
    register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser ] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    async function fetchUser() {
        try {
            const res = await fetch("/api/auth/me", {credentials: "include"});
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;

        async function startRefresh() {
            try {
                await fetch("/api/auth/refresh", {
                    method: "POST",
                    credentials: 'include',
                })
                await fetchUser();
            } catch {
                setUser(null);
            }
        }
        fetchUser();

        interval = setInterval(startRefresh, 10 * 60 * 1000);

        return () => clearInterval(interval);
    }, [])

    async function login(username: string, password: string) {
        try {
           const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password }),
        }); 
        if (!res.ok) throw new Error("Login failed");
        await fetchUser();
        } catch (err) {
            console.error("Something went wrong:", err)
            }
    }

    async function register(username: string, email: string, password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            console.error("Passwords do not match", 401)
            return
        }
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ username, email, password })
            })
            if (!res.ok) throw new Error("Registration failed");
            await fetchUser();
        } catch(err) {
            console.error("Something went wrong", 401)
        }
    }

    async function logout() {
        try {
            fetch("/api/auth/logout", {method: 'POST', credentials: 'include'});
        } finally {
          setUser(null);  
        }
    }
    return (
        <AuthContext.Provider value = {{ user, loading, login, logout, register }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx
}