"use client"

import { useCurrentUser } from "@/app/_hooks/useCurrentUser"
import LocationForm from "../ui/LocationForm"
import Services from "./Services"

const HomeLayout = () => {
    const { data: user } = useCurrentUser()

    return (
        <>
            {
                
                !user ? (
                    <><LocationForm />
                        <Services /></>) :
                    (<div>USER LOGGED IN NOW!</div>)
            }
        </>
    )
}

export default HomeLayout