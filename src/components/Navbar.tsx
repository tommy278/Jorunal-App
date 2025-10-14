"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Search from "./search/Search"

export default function Navbar() {
    const {user, logout} = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    }

    return(
        <nav className="flex justify-end gap-x-10 mr-5 p-10">
            {!user ? (
                <div className="navbar">
                    <div className="nav-item" onClick={() => router.push("/dashboard")}>Home</div>
                    <div className="nav-item" onClick={() => router.push("/login")}>Login</div>
                    <div className="nav-item" onClick={() => router.push("/register")}>Register</div>
                </div>
            ): (
            <div className="navbar">
                <div className="nav-item" onClick={() => router.push("/dashboard/entries")}>Home</div>
                <div className="nav-item">
                    <Search />
                </div>
                <Link href="/dashboard/new_entry" className="nav-item">New Entry</Link>
                <div className="nav-item" onClick={handleLogout}>Logout</div>
            </div>
            )}
        </nav>
    )
}
