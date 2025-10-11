"use client";

export default function Home() {
    
    async function handleLogout() {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
        })
        const data = await res.json()

        if (!res.ok) {
            console.error(data.error || "Logout failed");
            return;
        }
        console.log(data.message);
        window.location.href = "/login";
    }
    
    return(
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}