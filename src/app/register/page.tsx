"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Register() {
  const { register, login } = useAuth();
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    const username = (formData.get('username') as string).trim();
    const password = (formData.get('password') as string).trim();
    const confirmPassword = (formData.get('confirm_password') as string).trim();
    const email = (formData.get('email') as string).trim();

    try {
      await register(username, email, password, confirmPassword);
      await login(username, password)
      console.log("Successfully registered");
    } catch(err) {
      console.error("Registration failed", err)
    }
  }

  return(
    <form onSubmit={handleRegister}>
      <input name="username" placeholder="Username" type="text" />
      <input name="password" placeholder="Password" type="password" />
      <input name="confirm_password" placeholder="Confirm Password" type="password" />
      <input name="email" placeholder="Enter email here..." type="email" />
      <button type="submit">Register</button>
    </form>
  )
}