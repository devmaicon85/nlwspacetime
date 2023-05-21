'use client'

import { FormEvent, useState } from 'react'
import { MediaPicker } from './MediaPicker'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { MemoriesType } from '@/types/Memories'

type Props = {
  memory?: MemoriesType
}
export function NewMemoryForm({ memory }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''
    const id = formData.get('id')?.toString()
    const content = formData.get('content')?.toString()
    const isPublic = formData.get('isPublic')?.toString()

    if (!content || content.trim().length < 5) {
      setError('Fale sobre seu momento marcante.')
      return
    }

    if (fileToUpload instanceof File) {
      if (fileToUpload.size > 0) {
        const uploadFormData = new FormData()
        uploadFormData.set('file', fileToUpload)

        const uploadResponse = await api.post('/upload', uploadFormData)

        coverUrl = uploadResponse.data.fileUrl
      }
    }

    if (!coverUrl && !memory?.coverUrl) {
      setError('Selecione uma foto ou vídeo')
      return
    }

    if (id) {
      console.log('--> atualizando')
      await api.put(
        `/memories/${id}`,
        {
          coverUrl,
          content,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        },
      )
    } else {
      console.log('--> incluindo')

      await api.post(
        '/memories',
        {
          coverUrl,
          content,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        },
      )
    }

    router.push('/')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col ">
      <div className="flex flex-col  gap-4 pb-4 ">
        <input
          type="text"
          name="id"
          id="id"
          defaultValue={memory?.id ?? ''}
          className="hidden"
        />
        <label
          htmlFor="isPublic"
          className="flex h-14 max-w-min cursor-pointer items-center gap-1.5 whitespace-nowrap text-xs text-gray-200 hover:text-gray-100 sm:text-sm lg:text-base"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            defaultChecked={!!memory?.isPublic}
            className="h-5 w-5 rounded border-gray-400 bg-gray-700 text-purple-500 "
          />{' '}
          Visibilidade Pública {memory?.isPublic ? 'true' : 'false'}
        </label>

        <MediaPicker midiaDefault={memory?.coverUrl} />
      </div>

      <textarea
        name="content"
        defaultValue={memory?.content ?? ''}
        spellCheck={false}
        placeholder="Fique livre relatar seu momento marcante que deseja lembrar para sempre..."
        className="mt-4 min-h-[120px] w-full flex-1 resize-none rounded border-0 bg-transparent p-0  text-base leading-relaxed text-gray-100  placeholder:text-gray-400 focus:ring-0 md:text-lg"
      />

      <hr className="my-2 opacity-5" />
      <div className="my-2 h-6 self-end text-sm text-red-700">{error}</div>

      <button type="submit" className="button-green w-full self-end md:w-48 ">
        Salvar
      </button>
    </form>
  )
}
