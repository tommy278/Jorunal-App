import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import {getUserFromServer} from "@/lib/auth"
import './globals.css'

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) 
{
  const user = await getUserFromServer();
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Navbar serverUser={user}/>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
