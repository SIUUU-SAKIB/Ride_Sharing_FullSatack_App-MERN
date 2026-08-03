
import BottomNav from "./_components/Navigation/BottomNav"
import Nav from "./_components/Navigation/Nav"
import HomeLayout from "./_components/home/HomeLayout"

const HomePage = () => {
  return (
   <div className="bg-zinc-900/20 min-w-full">
     <div className="bg-[url('/main-bg.png')] min-h-screen object-contain relative flex flex-col max-w-7xl mx-auto shadow-xl">
      <div className="absolute inset-0 bg-gray-100/40"></div>
      <Nav />
      <div className="max-h-100 p-8 shadow-sm rounded-lg mt-12 z-10 flex flex-col items-center">
        <HomeLayout/>
      </div>
      <BottomNav />
    </div>
   </div>
  )
}

export default HomePage