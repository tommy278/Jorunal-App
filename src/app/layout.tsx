import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/context/ThemeContext'
import { getUserFromServer } from '@/lib/auth'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUserFromServer()
  return (
    <html lang="en" className="pt-16">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Navbar serverUser={user} />
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
