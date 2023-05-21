import Image from 'next/image'
import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="flex flex-col items-center space-y-5  lg:items-start">
      <Image src={nlwLogo} alt="NLW Spacetime" />
      <div className="max-w-[430px] space-y-1 text-center lg:text-left">
        <h1 className="text-2xl font-bold leading-tight text-gray-50 xl:text-4xl 2xl:lg:text-5xl ">
          Sua cápsula do Tempo
        </h1>
        <p className="text-sm leading-relaxed md:text-lg">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo
        </p>
      </div>

      <Link href="/memories/new" className="button-green">
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  )
}
