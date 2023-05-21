export function BackgroundMobile() {
  return (
    <div className="fixed inset-0 -z-10 flex h-screen w-full flex-1 overflow-hidden lg:hidden">
      {/* Stripes */}
      <div className="absolute bottom-0 left-2 top-0 w-2  bg-stripes "></div>
      {/* Blur */}
      <div className="absolute right-0 top-1/2  h-[288px]   w-full -translate-y-1/2  translate-x-1/2 rounded-full  bg-purple-700 opacity-50 blur-[124px]  sm:blur-[144px] md:blur-full  " />
    </div>
  )
}
