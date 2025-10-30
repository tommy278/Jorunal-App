"use client";

import { useAuth } from "@/context/AuthContext";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next/navigation"

export default function Logout() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    }

    return(
        <>
            <button onClick={() => handleLogout()}>
                <GoSignOut className="w-6 h-6 text-gray-700 dark:text-white hover:text-blue-500 cursor-pointer"/>
            </button>
        </>
    )
}