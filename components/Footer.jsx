"use client"
import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Linkedin, Code } from 'lucide-react'

const Footer = () => {
  return (
    <div className="w-full h-20 bg-white/10 text-center flex justify-between items-center px-8">
      <div className="flex justify-center space-x-6">
          <Link href="#" className="hover:text-white/80 transition-colors bg-white/20 rounded-full p-2">
            <Github size={20} />
          </Link>
          <Link href="#" className="hover:text-white/80 transition-colors bg-white/20 rounded-full p-2">
            <Twitter size={20} />
          </Link>
          <Link href="#" className="hover:text-white/80 transition-colors bg-white/20 rounded-full p-2">
            <Linkedin size={20} />
          </Link>
          <Link href="#" className="hover:text-white/80 transition-colors bg-white/20 rounded-full p-2">
            <Code size={20} />
          </Link>
        </div>
      <div>
        &copy; {new Date().getFullYear()} Next-Auth, All rights reserved. <br />
      </div>

    </div>
  )
}

export default Footer;