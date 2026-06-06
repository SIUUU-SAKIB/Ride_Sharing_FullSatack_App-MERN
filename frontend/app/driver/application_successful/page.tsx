import Driver_application_successful from "@/app/_components/pages/Driver_application_successful"

const ApplicationSuccessful = () => {
  return (
    <div className="min-h-screen min-w-screen bg-[url('/applicatoin_successful_bg.png.jpg')] bg-cover bg-center relative ">
      {/* overlay */}
      <div className="w-full h-full bg-white opacity-90 absolute z-10"></div>
        <Driver_application_successful/>
    </div>
  )
}

export default ApplicationSuccessful