"use client";

import {useState} from 'react';

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

    async function handleLogin() {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password }),
        credentials: "include",
      })
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Registration Failed")
        return;
      }
      setMessage("Login successful")
    }

  return (
    <div>
    <p>{message}</p>
      <input placeholder="Username or Email" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}