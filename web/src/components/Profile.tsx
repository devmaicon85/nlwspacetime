import Image from 'next/image'

type Props = {
  name: string
  avatarUrl: string
}
export function Profile({ name, avatarUrl }: Props) {
  if (!name || !avatarUrl) return <></>

  return (
    <div className="flex items-center gap-3 text-left transition-colors hover:text-gray-50">
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-400">
        <Image src={avatarUrl} width={48} height={48} alt={name} />
      </div>

      <div className="max-w-[140px] text-sm leading-snug">
        <div className="max-w-[100px] truncate">{name}</div>
        <a
          href="/api/auth/logout"
          className="whitespace-nowrap text-red-200 hover:text-red-300"
        >
          Sair da Cápsula
        </a>
      </div>
    </div>
  )
}
