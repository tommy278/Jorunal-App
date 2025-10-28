"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Search from "./search/Search"

import { GoSignOut } from "react-icons/go";
import { GoPlusCircle } from "react-icons/go"
import { GoSearch } from "react-icons/go"
import { GoRepo } from "react-icons/go";

export default function Navbar() {
    const {user, logout} = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    }

    const iconClass = "w-6 h-6 text-gray-700 dark:text-white hover:text-blue-500 cursor-pointer"
    const textClass = "text-gray-700 dark:text-white hover:text-blue-500 cursor-pointer"
    const style = "py-2 flex justify-center"

    return(
        <nav className="flex items-center justify-between px-6 bg-white dark:bg-gray-900 shadow-md">
            <div className="flex items-center space-x-4 cursor-pointer">
                {!user ? (
                    <div className="nav-item" onClick={() => router.push("/")}>
                        <GoRepo className={iconClass}/>
                    </div>
                ):(
                    <div className="nav-item" onClick={() => router.push("/dashboard/entries")}>
                        <GoRepo className={iconClass}/>
                    </div>
                )}
            </div>

            
            <div className="flex items-center space-x-8 mx-6">
            {!user ? (
                <>
                    <div className={style}>
                        <div className="nav-item" onClick={() => router.push("/login")}>
                            <div className={textClass}>Login</div>
                        </div>  
                    </div>

                    <div className={style}>
                        <div className="nav-item" onClick={() => router.push("/register")}>
                            <div className={textClass}>Register</div>
                        </div>
                    </div>
                </>
            ): (
            <>
                <div className={style}>
                    <Search icon={<GoSearch className={iconClass}/>}/>
                </div>

                <div className={style}>
                    <Link href="/dashboard/new_entry" >
                        <GoPlusCircle className={iconClass}/>
                    </Link>
                </div>

                <div className={style}>
                    <div className="nav-item" onClick={handleLogout}>
                        <GoSignOut className={iconClass}/>
                    </div>
                </div>   
            </>
            )}
            </div>
        </nav>
    )
}
