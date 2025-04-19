"use client"
import React from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

const Navbar = () => {
  const { isSignedIn } = useAuth()
  return (
    <>
      {!isSignedIn && (
        <nav className="m-[15px] fixed w-[calc(100%-30px)]">
          <div className="bg-white/10 border border-white/70 transition ease-in-out duration-300 transform shadow-xs hover:shadow-md shadow-white/80 mb-6 py-4 px-8 rounded-xl flex items-center justify-between">
            <div className="heading text-2xl font-bold text-white">
              Next Auth Application
            </div>
            <div className="flex items-center justify-end gap-6">
            <Link href="/sign-in">Sign in</Link>
            <Link href="/sign-up">Sign up </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}

export default Navbar;