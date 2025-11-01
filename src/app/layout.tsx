import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/context/ThemeContext'
import { getUserFromServer } from '@/lib/auth'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUserFromServer()
  return (
    <html lang="en" className="pt-16">
      <body className="bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 text-gray-800 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100">
        <AuthProvider>
          <ThemeProvider>
            <Navbar serverUser={user} />
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
            <Toaster position="top-right" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
