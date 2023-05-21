import { Header } from '@/components/Header'
import { NewMemoryForm } from '@/components/NewMemoryForm'
import { api } from '@/lib/api'
import { MemoriesType } from '@/types/Memories'
import { cookies } from 'next/headers'

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
      <div className="flex h-full w-full flex-col gap-4 px-8 py-8  sm:px-10 xl:px-20">
        <hr className="my-4 opacity-5" />

        <NewMemoryForm memory={memory} />
      </div>
    </>
  )
}
