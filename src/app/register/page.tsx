"use client";

import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { register } = useAuth();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    const username = (formData.get('username') as string).trim();
    const password = (formData.get('password') as string).trim();
    const confirmPassword = (formData.get('confirm_password') as string).trim();
    const email = (formData.get('email') as string).trim();

    try{
      await register(username, email, password, confirmPassword);
      console.log("Succesfully registered");
    } catch(err) {
      console.error("Registration failed", err)
    }
  }
  return(
    <form onSubmit={handleRegister}>
      <input name="username" placeholder="Username" />
      <input name="password" placeholder="password" />
      <input name="confirm_password" placeholder="Confirm Password" />
      <input name="email" placeholder="Enter email here..." />
      <button type="submit">Register</button>
    </form>
  )
}