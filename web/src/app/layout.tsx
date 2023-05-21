import { ReactNode } from 'react'

import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'
import { BackgroundLeft } from '@/components/BackgroundLeft'

import './globals.css'

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { BackgroundMobile } from '@/components/BackgroundMobile'

import { cookies } from 'next/headers'
import { Profile } from '@/components/Profile'
import { getUser } from '@/lib/auth'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '600', '700'],
})

const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, NextJs, TailwindCss e TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticate = cookies().has('token')

  const { name, avatarUrl } = getUser()

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          <div
            className={` 
                ${isAuthenticate && 'hidden lg:flex'} 
                relative flex h-screen flex-col items-center justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] px-4 py-16 md:px-10 lg:items-start xl:px-28`}
          >
            <BackgroundLeft />

            {!isAuthenticate ? (
              <SignIn />
            ) : (
              <Profile avatarUrl={avatarUrl} name={name} />
            )}

            <Hero />

            <Copyright />
          </div>

          <div className="flex max-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden bg-[url(../assets/bg-stars.svg)]  lg:items-start ">
            <>
              <BackgroundMobile />

              {children}
            </>
          </div>
        </main>
      </body>
    </html>
  )
}
