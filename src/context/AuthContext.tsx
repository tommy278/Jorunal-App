"use client";

import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { isValidEmail, isCommonEmail, isValidPassword } from "@/lib/validation";
import { useRouter } from "next/navigation";

type User = { id: string; email: string } | null;

interface AuthContextProps {
    user: User;
    loading: boolean;
    login: (username: string, password: string ) => Promise<void>;
    register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser ] = useState<User>(null);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const router = useRouter();

    async function fetchUser(signal?: AbortSignal) {
        try {
            const res = await fetch("/api/auth/me", {credentials: "include", signal });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                return(data.user) // return the user object for login
            } else {
                setUser(null);
                return null
            }
        } catch {
            setUser(null);
            return null
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let aborted: boolean = false;
        const RETRY_DELAY: number = 10000;
        const REFRESH_INTERVAL: number = 5 * 60 * 1000;
        let retries: number = 0;
        let MAX_RETRIES: number = 3;

        async function startRefreshLoop() {
            if (aborted) return;
            try {
                await fetch("/api/auth/refresh", { method: "POST", credentials: "include" })
                await fetchUser();
                retries = 0
            } catch (err) {
                console.error("Could not refresh session", err)
                retries += 1;
                if (retries <= MAX_RETRIES) {
                    if (!aborted) setTimeout(startRefreshLoop, RETRY_DELAY)
                    return;
                } else {
                    console.warn("Max retries reached, logging out.")
                    setUser(null);
                    return;
                }
            }
            if (!aborted) setTimeout(startRefreshLoop, REFRESH_INTERVAL)
        }
        startRefreshLoop();

        return () => {
            aborted = true;
        };
    }, [])

    async function login(username: string, password: string) {
        try {
           const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password }),
        }); 
        if (!res.ok) throw new Error("Login failed");

        // Save the user's id to append to dashboard
        const user = await fetchUser();
        router.push(`/dashboard/${user.id}`)
        
        } catch (err) {
                console.error("Something went wrong:", err)
            }
        }

    async function register(username: string, email: string, password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match")
        }

        if (!isValidPassword(password)) {
            throw new Error("Password not strong enough")
        }

        if (!isValidEmail(email)) {
            throw new Error("Not a valid email address")
        } 
        if (!isCommonEmail(email)){
            throw new Error("Please use a Gmail, Yahoo, or Outlook email!")
        } 

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, email, password })
        })

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data?.message || "Registration failed");
        }
        
        await fetchUser();
    }

    async function logout() {
        try {
            if (abortControllerRef.current) abortControllerRef.current.abort();
            if (intervalRef.current) clearInterval(intervalRef.current);
            await fetch("/api/auth/logout", {method: 'POST', credentials: 'include'});
        } catch (err){
            console.error("Logout failed", err)
        }finally {
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