"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const {user, logout} = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    }

    return(
        <nav>
            {!user ? (
                <div>
                    <Link href="/">Home</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </div>
            ): (
                <div>
                    <Link href="/dashboard">Home</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    )
}
