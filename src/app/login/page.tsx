"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login () {
  const { login } = useAuth();
  const router = useRouter();

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
      <input name="username" placeholder="Username" type="username" />
      <input name="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}