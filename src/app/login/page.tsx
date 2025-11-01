'use client'

import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { IoEyeSharp } from 'react-icons/io5'
import { FaEyeSlash } from 'react-icons/fa'
import CenterContainer from '@/components/CenterContainer'
import { input, inputSize, box, headerFormat } from '@/lib/themes/constants'

export default function Login() {
  const { login } = useAuth()
  const [hidden, setHidden] = useState(true)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      await login(username, password)
      console.log('Logged In!')
    } catch (err) {
      console.error('Login failed', err)
    }
  }

  return (
    <CenterContainer>
      <form onSubmit={handleSubmit} className={box}>
        <h2 className="font-bold" style={headerFormat}>
          Login
        </h2>
        <input
          name="username"
          placeholder="Username / Email"
          type="username"
          className={input}
          style={{ width: '70%', marginBottom: '10px' }}
        />
        <div
          style={{ position: 'relative', width: '70%', marginBottom: '10px' }}
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
        <button
          type="submit"
          className={
            input + ' cursor-pointer bg-gray-200 text-black hover:bg-blue-700'
          }
          style={inputSize}
        >
          Login
        </button>
      </form>
    </CenterContainer>
  )
}
