import { Header } from '@/components/Header'
import { api } from '@/lib/api'
import { MemoriesType } from '@/types/Memories'
import dayjs from 'dayjs'

import ptBr from 'dayjs/locale/pt-br'
import { Edit2 } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

dayjs.locale(ptBr)

type Params = {
  params: {
    id: string
  }
}
export default async function Page({ params }: Params) {
  const isAuthenticate = cookies().has('token')

  if (!isAuthenticate) {
    return <div>Não autenticado</div>
  }

  const token = cookies().get('token')?.value

  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory = response.data as MemoriesType

  return (
    <>
      <Header backButton="/" />
      <div className="my-12 flex h-full w-full flex-col gap-4 p-8">
        <hr className="my-4 opacity-5" />
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
            <p className="py-10 text-lg leading-relaxed text-gray-100">
              {memory.content}
            </p>
            <Link
              href={`/memories/${memory.id}/edit`}
              className="my-5 flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Editar <Edit2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
