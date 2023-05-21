'use client'

import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

type Props = {
  midiaDefault?: string
}

export function MediaPicker({ midiaDefault }: Props) {
  const [preview, setPreview] = useState<string | null>(midiaDefault ?? null)
  const [isVideo, setIsVideo] = useState(false)

  function onFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    if (files[0].type.toLowerCase().startsWith('video')) {
      setIsVideo(true)
    } else {
      setIsVideo(false)
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <label
        htmlFor="media"
        className="flex min-h-[112px] cursor-pointer items-center justify-center gap-1.5 rounded border border-purple-800/50 p-4 text-center text-sm text-gray-200 outline-indigo-950 hover:border-purple-950 hover:text-gray-100 lg:border-purple-950/50"
      >
        {!preview && (
          <>
            <ImagePlus className="h-6 w-6" />
            Adicionar foto ou video de capa
          </>
        )}

        {/* VIDEO */}
        {preview && isVideo && (
          <video
            controls
            className="aspect-video max-h-40 rounded-lg object-cover sm:max-h-52 lg:max-h-72"
          >
            <source src={preview ?? midiaDefault} type="video/mp4" />
          </video>
        )}

        {/* IMAGE */}
        {preview && !isVideo && (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
            src={preview ?? midiaDefault}
            width={400}
            height={400}
            alt={preview}
            title={preview}
            className="aspect-video max-h-40 rounded-lg object-cover sm:max-h-52 lg:max-h-72"
          />
        )}
      </label>
      <input
        type="file"
        name="coverUrl"
        accept=".jpg,.jpeg,.png,.gif,.mp4,.webm,.ogg,.mkv"
        onChange={onFileSelect}
        id="media"
        className="invisible h-0 w-0"
      />
    </>
  )
}
