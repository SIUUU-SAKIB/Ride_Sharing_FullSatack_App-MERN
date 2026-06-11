import Driver_application_successful from "@/app/driver/_components/Driver_application_successful"

const ApplicationSuccessful = () => {
  return (
 <div
  style={{
    backgroundImage: "url('/Application_Success.jpg')",
  }}
  className="min-h-screen bg-cover bg-center relative"
>
  <div className="absolute inset-0 bg-white/90"></div>

  <div className="relative z-20">
    <Driver_application_successful />
  </div>
</div>
  )
}

export default ApplicationSuccessful