"use client";

import { useAuth } from "@/context/AuthContext";

export default function Login () {
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      await login(username, password);
      console.log("Logged In!")
    } catch (err) {
      console.error("Login failed", err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" />
      <input name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}