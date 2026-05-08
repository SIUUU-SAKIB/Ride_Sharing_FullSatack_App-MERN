import LocationForm from "./_components/Forms/LocationForm"
import BottomNav from "./_components/Navigation/BottomNav"
import Nav from "./_components/Navigation/Nav"
import Services from "./_components/Services"

const HomePage = () => {
  return (
    <div className="bg-[url('/main-bg.png')] min-h-screen min-w-screen object-contain relative flex flex-col ">
      <div className="overlay w-full h-full absolute bg-gray-100/60 top-0 left-0 "></div>
      <Nav/>
      {/* FORMS */}
      <div className="max-w-6xl max-h-100 p-8 bg-white shadow-sm rounded-lg mt-12 z-10 mx-auto">
        <LocationForm/>
        <Services/>
      </div>
      {/* FORMS END */}
      <BottomNav/>
    </div>
  )
}

export default HomePage