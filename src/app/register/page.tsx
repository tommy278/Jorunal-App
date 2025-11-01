'use client'

import { useAuth } from '@/context/AuthContext'
import { IoEyeSharp } from 'react-icons/io5'
import { FaEyeSlash } from 'react-icons/fa'
import CenterContainer from '@/components/CenterContainer'
import toast from 'react-hot-toast'

import { useState } from 'react'

export default function Register() {
  const { register, login } = useAuth()
  const [hidden, setHidden] = useState(true)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const username = (formData.get('username') as string).trim()
    const password = (formData.get('password') as string).trim()
    const confirmPassword = (formData.get('confirm_password') as string).trim()
    const email = (formData.get('email') as string).trim()

    try {
      await register(username, email, password, confirmPassword)
      await login(username, password)
      toast.success('Successfully registered')
    } catch (err) {
      toast.error('Registration failed')
      console.error('Registration failed', err)
    }
  }

  const input = 'p-2 border border-gray-200 rounded'
  const inputSize = { width: '70%', marginBottom: '15px' }

  const box = `
  flex flex-col items-center justify-center space-y-4
  w-11/12
  max-w-md
  gap-4 
  sm:w-2/3 
  md:w-2/5
  h-1/2
  border border-gray-300 rounded shadow-md
  bg-white/10 backdrop-blur-md
  p-10
`

  const headerFormat = { marginBottom: '15px', fontSize: '200%' }

  return (
    <CenterContainer>
      <form onSubmit={handleRegister} className={box}>
        <h2 className="font-bold" style={headerFormat}>
          Register
        </h2>
        <input
          name="username"
          placeholder="Username"
          type="text"
          className={input}
          style={inputSize}
        />
        <input
          name="email"
          placeholder="Enter email here..."
          type="email"
          className={input}
          style={inputSize}
        />
        <div
          style={{ position: 'relative', width: '70%', marginBottom: '15px' }}
        >
          <input
            name="password"
            placeholder="Password"
            type={hidden ? 'password' : 'text'}
            className={input}
            style={{ paddingRight: '2.5rem', width: '100%' }}
          />
          <button
            type="button"
            onClick={() => setHidden(!hidden)}
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {hidden ? <IoEyeSharp /> : <FaEyeSlash />}
          </button>
        </div>
        <div
          style={{ position: 'relative', width: '70%', marginBottom: '15px' }}
        >
          <input
            name="confirm_password"
            placeholder="Confirm Password"
            type={hidden ? 'password' : 'text'}
            className={input}
            style={{ paddingRight: '2.5rem', width: '100%' }}
          />
          <button
            type="button"
            onClick={() => setHidden(!hidden)}
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {hidden ? <IoEyeSharp /> : <FaEyeSlash />}
          </button>
        </div>
        <button
          type="submit"
          className={
            input + ' cursor-pointer bg-gray-200 text-black hover:bg-blue-700'
          }
          style={inputSize}
        >
          Register
        </button>
      </form>
    </CenterContainer>
  )
}
