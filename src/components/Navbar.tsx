"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Search from "./search/Search"

import { GoSignOut } from "react-icons/go";
import { GoPlusCircle } from "react-icons/go"
import { GoSearch } from "react-icons/go"
import { GoRepo } from "react-icons/go";
import Logout from "@/components/Logout"

type User = { id: string; email: string } | null;

interface NavbarProps {
    serverUser?: User | null;
}

export default function Navbar({ serverUser }: NavbarProps ) {
    const {user: clientUser} = useAuth()
    const user = clientUser ?? serverUser;

    const iconClass = "w-6 h-6 text-gray-700 dark:text-white hover:text-blue-500 cursor-pointer"
    const textClass = "text-gray-700 dark:text-white hover:text-blue-500 cursor-pointer"
    const style = "py-2 flex justify-center"

    return(
        <nav className="flex items-center justify-between px-6 bg-white dark:bg-gray-900 shadow-md">
            <div className="flex items-center space-x-4 cursor-pointer">
                {!user ? (
                    <Link className="nav-item" href="/">
                        <GoRepo className={iconClass}/>
                    </Link>
                ):(
                    <Link className="nav-item" href="/dashboard/entries">
                        <GoRepo className={iconClass}/>
                    </Link>
                )}
            </div>

            
            <div className="flex items-center space-x-8 mx-6">
            {!user ? (
                <>
                    <div className={style}>
                        <Link className="nav-item" href="/login">
                            <div className={textClass}>Login</div>
                        </Link>  
                    </div>

                    <div className={style}>
                        <Link className="nav-item" href="/register">
                            <div className={textClass}>Register</div>
                        </Link>
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
                    <Logout />
                </div>
            </>
            )}
            </div>
        </nav>
    )
}
