'use client'
import { useCurrentUser } from '@/app/_hooks/useCurrentUser'
import { DriverApplicationFormData, driverApplicationSchema } from '@/app/lib/validations/driver-application.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import RadioGroup from '../ui/RadioGroup'
import { IVehicleOwnsership, IVehicleType } from '@/app/_interfaces/driver.interface'


const DriverRegistrationForm = () => {
    const router = useRouter()
    const { data: session } = useCurrentUser()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(driverApplicationSchema)
    })
    const ownerShipOptions = [
        "Owned",
        "Rent"
    ]
    const vehicleOptions = [
        "Two Wheeler",`Three Wheeler`, `Four Wheeler`
    ]
    const onSubmit: SubmitHandler<DriverApplicationFormData> = async (data) => {
        console.log(`hello`)
    }
    // if (!session) {
    //     router.push(`/login`)
    // }
    return (
        <div className='max-w-5xl mx-auto gap-4 items-start px-4 bg-white rounded-lg py-12'>
            <div className='flex items-center gap-2'>
                <User className='text-lg text-(--primary)' />
                <p className='text-xl md:text-2xl xl:text-2xl text-black/90 font-bold py-4'>Driver Information</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 px-2 py-4'>
                {/* LICENSE NUMBER*/}
                <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Driving License Number</label>
                    <input
                        {...register('licenseNumber')}
                        placeholder='BL-XXXX-XXXX'
                        type='text'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none'
                    />
                </div>
                {/* LICENSE IMAGE */}
                <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Driving License Image</label>
                    <input
                        {...register('licenseImage')}
                        placeholder='BL-XXXX-XXXX'
                        type="file"
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none cursor-pointer'
                    />
                </div>
                {/* VEHICLE NUMBER*/}
                <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Vehicle Number</label>
                    <input
                        {...register('vehicleNumber')}
                        placeholder='Metro-GA-11-2222'
                        type='text'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none'
                    />
                    {errors.vehicleNumber&&<p className='text-red-500 font-semibold'>{errors.vehicleNumber.message}</p>}
                </div>
                {/* LICENSE IMAGE */}
                <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Vehicle Image</label>
                    <input
                        {...register('vehicleImage')}
                        placeholder='BL-XXXX-XXXX'
                        type="file"
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none cursor-pointer'
                    />
                    {errors.licenseImage&&<p className='text-red-500 font-semibold'>{errors.licenseImage.message}</p>}
                </div>
                 {/* NID NUMBER */}
                 <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>NID Number</label>
                    <input
                        {...register('nidNumber')}
                        placeholder='91XXXXXXXXXXX'
                        type='text'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none'
                    />
                    {errors.nidNumber&&<p className='text-red-500 font-semibold'>{errors.nidNumber.message}</p>}
                </div>
                   {/* PHONE NUMBER */}
                 <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Phone Number</label>
                    <input
                        {...register('phoneNumber')}
                        placeholder='880-1XXXXXXXX'
                        type='text'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none'
                    />
                      {errors.phoneNumber&&<p className='text-red-500 font-semibold'>{errors.phoneNumber.message}</p>}
                </div>
                 {/* PHONE NUMBER */}
                 <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Address</label>
                    <textarea
                        {...register('address')}
                        placeholder='Enter your full residential address'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none'
                    />
                    {errors.address&&<p className='text-red-500 font-semibold'>{errors.address.message}</p>}
                </div>
                     {/* GENDER */}
                <RadioGroup
                label='Blood Group'
                options={["Male", "Female", "Others"]}
                register={register('gender')}
                error={errors.gender}
                />
                {/* BLOOD GROUP */}
                <RadioGroup
                label='Blood Group'
                options={["A+", "A-", "AB","AB-", "B+", "B-", "O+", "O-"]}
                register={register('bloodType')}
                error={errors.bloodType}
                />
                {/* VEHICLE TYPE */}
                <RadioGroup
                label='Vehicle Type'
                options={vehicleOptions}
                register={register("vehicleType")}
                error={errors.vehicleType}
                
                />
                {/* VEHICLE OWNERSHIP */}
                <RadioGroup
                    label='Vehicle Ownershop'
                    options={ownerShipOptions}
                    register={register("vehicleOwnership")}
                    error={errors.vehicleOwnership}
                />
               

            </form>
        </div>
    )
}

export default DriverRegistrationForm