"use client"

import { useCurrentUser } from "@/app/_hooks/useCurrentUser"
import LocationForm from "../ui/LocationForm"
import Services from "./Services"
import MainHomePage from "./MainHomePage"

const HomeLayout = () => {
    const { data: user } = useCurrentUser()

    return (
        <>
            {
                
                !user ? (
                    <><LocationForm />
                        <Services /></>) :
                    (<MainHomePage/>)
            }
        </>
    )
}

export default HomeLayout