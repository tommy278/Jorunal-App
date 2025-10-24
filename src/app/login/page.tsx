"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from 'react';
import { IoEyeSharp } from "react-icons/io5"
import { FaEyeSlash } from "react-icons/fa"

export default function Login () {
  const { login } = useAuth();
  const [ hidden, setHidden ] = useState(true);

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

  const container = "flex flex-col h-screen md:svh items-center justify-center"
  const input = "p-2 border border-gray-200 rounded"
  const inputSize = { width: "70%", height: "10%", marginBottom: "10px"}

  const box = `
  flex flex-col items-center justify-center space-y-4
  w-11/12  
  sm:w-2/3 
  md:w-2/5
  h-1/2
  border border-gray-300 rounded shadow-md
  bg-white/10 backdrop-blur-md
`;

  const headerFormat={ marginBottom: "10px", fontSize: "200%"}

  return (
    <div className={container}>
      <form onSubmit={handleSubmit} className={box}>
        <h2 className="font-bold" style={ headerFormat }>Login</h2>
        <input name="username" placeholder="Username / Email" type="username" className={input} style={inputSize}/>
        <div style={{ position: "relative", width: "70%", marginBottom: "10px" }}>
          <input name="password" 
            placeholder="Password" 
            type={ hidden ? "password": "text"} 
            className={input} 
            style={{ paddingRight: "2.5rem", width:"100%"}}/>
          <button
            type="button"
            onClick={() => setHidden(!hidden)}
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            >
              {hidden ? (
                <IoEyeSharp />
              ): (
                <FaEyeSlash />
              )}
            </button>
        </div>
        <button type="submit" className={input + " text-black cursor-pointer bg-gray-200 hover:bg-blue-700"} style={inputSize}>Login</button>
      </form>
    </div>
  );
}