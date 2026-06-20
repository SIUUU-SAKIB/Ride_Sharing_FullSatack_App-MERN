'use client'
import { useCurrentUser } from '@/app/_hooks/useCurrentUser'
import { DriverApplicationFormData, driverApplicationSchema } from '@/app/lib/validations/driver-application.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import RadioGroup from '../ui/RadioGroup'
import Link from 'next/link'
import { IVehicleOwnsership, IVehicleType } from '@/app/_interfaces/driver.interface'
import { useMutation } from '@tanstack/react-query'
import { DriverService } from '@/app/_services/driver'
import { toast } from 'sonner'


const DriverRegistrationForm = () => {
    const router = useRouter()
    const { data: session } = useCurrentUser()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<DriverApplicationFormData>({
        resolver: zodResolver(driverApplicationSchema)
    })

    const mutation = useMutation(
        {
            mutationFn: DriverService.driverApplication
        }
    )
    const onSubmit: SubmitHandler<DriverApplicationFormData> = async (data) => {
        try {
            const payload = {
                ...data,
                licenseImage: data.licenseImage,
                vehicleImage: data.vehicleImage
            }
            const response = await mutation.mutateAsync(payload)
            toast.success("Application submitted successfully")

            router.push("/driver/application_successful")
        } catch (error) {
            setError('root', {
                message:
                    error instanceof Error ? error.message
                        : typeof error === "string" ? error
                            : "Something went wrong"
            })
        }
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
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4  py-4'>
                {/* LICENSE NUMBER*/}
                <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Driving License Number</label>
                    <input
                        {...register('licenseNumber')}
                        placeholder='BL-XXXX-XXXX'
                        type='text'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none'
                    />
                    {errors.licenseNumber && <p className='text-red-500 font-semibold'>{errors.licenseNumber.message}</p>}
                </div>
                {/* LICENSE IMAGE */}
                <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Driving License Image</label>
                    <input
                        {...register('licenseImage')}
                        placeholder='BL-XXXX-XXXX'
                        type="file"
                        accept='image/*'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none cursor-pointer'
                    />
                    {errors.licenseImage && <p className='text-red-500 font-semibold'>{String(errors.licenseImage.message)}</p>}
                </div>
                {/* VEHICLE NAME */}
                <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Vehicle Name</label>
                    <input
                        {...register('vehicleName')}
                        placeholder='Enter vehicle full name'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none'
                    />
                    {errors.vehicleName && <p className='text-red-500 font-semibold'>{errors.vehicleName.message}</p>}
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
                    {errors.vehicleNumber && <p className='text-red-500 font-semibold'>{errors.vehicleNumber.message}</p>}
                </div>
                {/* LICENSE IMAGE */}
                <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Vehicle Image</label>
                    <input
                        {...register('vehicleImage')}
                        placeholder='BL-XXXX-XXXX'
                        type="file"
                        accept='image/*'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none cursor-pointer'
                    />
                    {errors.licenseImage && <p className='text-red-500 font-semibold'>{String(errors.licenseImage.message)}</p>}
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
                    {errors.nidNumber && <p className='text-red-500 font-semibold'>{errors.nidNumber.message}</p>}
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
                    {errors.phoneNumber && <p className='text-red-500 font-semibold'>{errors.phoneNumber.message}</p>}
                </div>
                {/* ADDRESS */}
                <div className='flex flex-col gap-2'>
                    <label className='text-md md:text-lg black font-medium'>Address</label>
                    <textarea
                        {...register('address')}
                        placeholder='Enter your full residential address'
                        className='text-(--neutral) text-md p-4 bg-zinc-100/80 border-none outline-none'
                    />
                    {errors.address && <p className='text-red-500 font-semibold'>{errors.address.message}</p>}
                </div>
                {/* GENDER */}
                <RadioGroup
                    label='Gender'
                    options={["Male", "Female", "Others"]}
                    register={register('gender')}
                    error={errors.gender}
                />
                {/* BLOOD GROUP */}
                <RadioGroup
                    label='Blood Group'
                    options={[
                        "A+",
                        "A-",
                        "AB+",
                        "AB-",
                        "B+",
                        "B-",
                        "O+",
                        "O-"
                    ]}
                    register={register('bloodType')}
                    error={errors.bloodType}
                />
                {/* VEHICLE TYPE */}
                <RadioGroup
                    label='Vehicle Type'
                    options={Object.values(IVehicleType)}
                    register={register("vehicleType")}
                    error={errors.vehicleType}

                />
                {/* VEHICLE OWNERSHIP */}
                <RadioGroup
                    label='Vehicle Ownership'
                    options={Object.values(IVehicleOwnsership)}
                    register={register("vehicleOwnership")}
                    error={errors.vehicleOwnership}
                />
                {/*terms checkbox  */}
                <div className="max-w-3xl mx-auto py-4">
                    <label className="flex items-start gap-3 cursor-pointer">

                        <input
                            {...register('termsAccepted')}
                            type="checkbox"
                            className="mt-1 h-5 w-5 shrink-0 cursor-pointer"
                        />
                        <span className="text-sm md:text-base text-(--neutral)">
                            I certify that the information provided in this application is accurate and complete. I agree to RideX's Terms of Service and Driver Policies.
                            <Link
                                href="/terms"
                                className="font-medium text-(--primary) hover:underline"
                            >
                                Terms of Service
                            </Link>
                        </span>

                    </label>
                    {errors.termsAccepted && (
                        <p className="text-red-500 text-sm">
                            {errors.termsAccepted.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
    w-full
    py-4
    rounded-xl
    text-center
    text-xl
    font-semibold
    text-white
    bg-(--primary)
    cursor-pointer
    transition-all
    duration-200
    hover:bg-(--primary)/90
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
                >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    )
}

export default DriverRegistrationForm