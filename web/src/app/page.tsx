import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { MemoriesType } from '@/types/Memories'
import { cookies } from 'next/headers'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/Header'

dayjs.locale(ptBr)

export default async function Home() {
  const isAuthenticate = cookies().has('token')

  if (!isAuthenticate) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories = response.data as MemoriesType[]

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <>
      <Header addButton="/memories/new" />
      <div className="my-12 flex flex-col gap-10 p-8">
        {memories.map((memory) => (
          <div key={memory.id} className="space-y-2">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <div className=" sm:px-10 xl:px-20">
              <Image
                src={memory.coverUrl}
                width={592}
                height={290}
                className="aspect-video max-w-xs rounded-lg object-cover  sm:max-w-sm md:max-w-md lg:max-w-lg"
                alt=""
              />
              <p className="text-lg leading-relaxed text-gray-100">
                {memory.content}
              </p>
              <Link
                href={`/memories/${memory.id}`}
                className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
              >
                Ler mais <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
