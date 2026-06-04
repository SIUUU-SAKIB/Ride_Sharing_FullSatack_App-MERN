"use client"

import { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface RadioGroupProps {
    label: string,
    options: string[],
    register: UseFormRegisterReturn,
    error?: FieldError
}
const RadioGroup = ({
    label,
    options,
    register,
    error
}: RadioGroupProps) => {
    return (
        <div className="">
            <label>{label}</label>
           <div className="flex items-center gap-2 justify-center px-4"> {options.map((option) => (
                <label key={option} className="cursor-pointer">
                    <input
                        type="radio"
                        value={option}
                        {...register}
                        className="hidden peer"
                    />
                    <span
                        className="block min-w-24
                rounded-lg
                bg-zinc-100
                px-6
                py-3
                text-center
                transition
                peer-checked:bg-(--primary)
                peer-checked:text-white
              "
                    >
                        {option}
                    </span>
                </label>
            ))}</div>
            {error && (
                <p className="text-sm font-medium text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    )
} 

export default RadioGroup