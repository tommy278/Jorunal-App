'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import Search from './search/Search'
import { GoPlusCircle } from 'react-icons/go'
import { GoSearch } from 'react-icons/go'
import { GoRepo } from 'react-icons/go'
import Logout from '@/components/Logout'
import { NavbarProps } from '@/lib/constants'
import { style, textClass, iconClass } from '@/lib/themes/constants'
import Logo from '@/components/Logo'

export default function Navbar({ serverUser }: NavbarProps) {
  const { user: clientUser } = useAuth()
  const user = clientUser ?? serverUser

  return (
    <nav className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-gray-200 px-6 shadow dark:bg-gray-900">
      <div className="flex cursor-pointer items-center gap-x-2">
        {!user ? (
          <>
            <Link className="nav-item flex items-center gap-x-2" href="/">
              <GoRepo className={iconClass} />
              <Logo />
            </Link>
          </>
        ) : (
          <>
            <Link
              className="nav-item flex items-center gap-x-2"
              href="/dashboard/entries"
            >
              <GoRepo className={iconClass} />
              <Logo />
            </Link>
          </>
        )}
      </div>

      <div className="mx-6 flex items-center gap-x-8">
        {!user ? (
          <>
            <div className={style}>
              <Link className="nav-item" href="/login">
                <div className={textClass}>Login</div>
              </Link>
            </div>

            <div className={style}>
              <Link className="nav-item" href="/register">
                <div className={textClass}>Register</div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={style}>
              <Search icon={<GoSearch className={iconClass} />} />
            </div>

            <div className={style}>
              <Link href="/dashboard/new_entry">
                <GoPlusCircle className={iconClass} />
              </Link>
            </div>

            <div className={style}>
              <Logout />
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
