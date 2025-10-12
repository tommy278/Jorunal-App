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
        <nav className="flex justify-end gap-x-5 mr-5">
            {!user ? (
                <>
                    <Link href="/">Home</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </>
            ): (
                <>
                    <button onClick={() => router.push(`/dashboard/${user.id}`)}>Home</button>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    )
}
