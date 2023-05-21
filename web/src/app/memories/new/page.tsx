import { Header } from '@/components/Header'
import { NewMemoryForm } from '@/components/NewMemoryForm'

export default function Page() {
  return (
    <>
      <Header backButton="/" />
      <div className="flex h-full w-full flex-col gap-4 px-8 py-8  sm:px-10 xl:px-20">
        <hr className="my-4 opacity-5" />

        <NewMemoryForm />
      </div>
    </>
  )
}
