'use client'

import { MouseEventHandler, useEffect, useState } from "react"
import AccountMenu from "./AccountMenu"
import { useSession } from "next-auth/react"

export default function Header() {
  const {status} = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    setIsAuthenticated(status === 'authenticated')
  }, [status])

  const onOutsideClick: MouseEventHandler = () => {
    setIsMenuOpen(false)
  }

  return (
      <header className="fixed t-0 flex w-full h-16 bg-gray-600 text-white items-center justify-between max-sm:justify-end shadow-md border-b border-b-gray-50 z-10">
        <div className="text-xl pl-4 max-sm:hidden">Управление клиентами</div>
        <div className="flex items-center justify-end pr-2">
          <AccountMenu onOutsideClick={onOutsideClick}/>
        </div>
      </header>
  )
}