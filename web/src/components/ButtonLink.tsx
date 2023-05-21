import Link from 'next/link'

type Props = {
  title: string
  href: string
}
export function ButtonLink({ href, title }: Props) {
  return (
    <Link href={href} className="">
      {title}
    </Link>
  )
}
