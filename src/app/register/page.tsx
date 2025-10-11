"use client";

import {useState} from 'react';

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

    async function handleRegister() {
        if (password != confirmPassword) {
          setMessage("Passwords must match")
          console.error("Passwords do not match")
          return;
        }
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ username, email, password })
        })
        const data = await res.json();
        if (!res.ok) {
          setMessage(data.error || "Registration Failed")
          return;
        }
        setMessage("Registration successful")
    }

  return (
    <div>
        <p>{message}</p>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
      <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      <input placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}type="password" />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}