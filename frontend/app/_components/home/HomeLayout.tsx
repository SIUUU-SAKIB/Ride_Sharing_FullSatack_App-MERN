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
                    <><LocationForm />
                        <Services /></>) :
                    (<MainHomePage 
                    />)
            }
        </>
    )
}

export default HomeLayout