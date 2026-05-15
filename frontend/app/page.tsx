import LocationForm from "./_components/Forms/LocationForm"
import BottomNav from "./_components/Navigation/BottomNav"
import Nav from "./_components/Navigation/Nav"
import Services from "./_components/home/Services"

const HomePage = () => {
  return (
   <div className="bg-zinc-900/20 min-w-full min-h-full">
     <div className="bg-[url('/main-bg.png')] min-h-screen object-contain relative flex flex-col max-w-7xl mx-auto shadow-xl">
      <div className="absolute inset-0 bg-gray-100/60"></div>
      <Nav />
      <div className="max-w-7xl  max-h-100 p-8 bg-white shadow-sm rounded-lg mt-12 z-10 mx-auto flex flex-col items-center">
        <LocationForm />
        <Services />
      </div>
      <BottomNav />
    </div>
   </div>
  )
}

export default HomePage