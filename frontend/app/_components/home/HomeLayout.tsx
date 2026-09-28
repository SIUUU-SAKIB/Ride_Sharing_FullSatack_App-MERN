"use client"
import { useCurrentUser } from "@/app/_hooks/useCurrentUser"
import Services from "./Services"
import MainHomePage from "./MainHomePage"
import LocationForm from "./LocationForm"
const HomeLayout = () => {

    const { data: user } = useCurrentUser()

    return (
        <>
            {
                
                !user ? (
                    <div className="flex items-center justify-center flex-col gap-12 max-w-7xl"
                    ><LocationForm />
                        <Services /></div>) :
                    (<MainHomePage 
                    />)
            }
        </>
    )
}

export default HomeLayout