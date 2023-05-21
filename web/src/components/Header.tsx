import { ChevronLeft, Plus } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Profile } from './Profile'
import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import { getUser } from '@/lib/auth'

type Props = {
  backButton?: string
  addButton?: string
}
export function Header({ backButton, addButton }: Props) {
  const isAuthenticate = cookies().has('token')

  const { name, avatarUrl } = getUser()

  return (
    <div className="fixed left-0 right-0 top-0 flex bg-gray-900/90 p-4 py-4 transition-all lg:left-1/2">
      {isAuthenticate && (
        <div className="flex w-full justify-between gap-4 ">
          {backButton && (
            <Link
              href={backButton}
              className="flex max-w-min items-center gap-1 whitespace-nowrap text-base text-gray-200 opacity-80 transition-opacity hover:text-gray-100 hover:opacity-100"
            >
              <ChevronLeft className=" h-10 w-10  rounded-full bg-purple-800 p-2" />
            </Link>
          )}

          {addButton && (
            <Link
              href={addButton}
              className="flex max-w-min items-center gap-1 whitespace-nowrap text-base text-gray-200 opacity-80 transition-opacity hover:text-gray-100 hover:opacity-100"
            >
              <Plus className=" h-10 w-10  rounded-full bg-green-700 p-2" />
            </Link>
          )}

          <Image
            src={nlwLogo}
            className="hidden max-w-[84px] transition-all xs:block sm:max-w-[128px]"
            alt="NLW Spacetime"
            width={128}
          />

          <Profile name={name} avatarUrl={avatarUrl} />
        </div>
      )}
    </div>
  )
}
