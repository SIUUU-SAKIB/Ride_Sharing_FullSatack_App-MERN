'use client'
import React from 'react'
type PassengerSelectorProps = {
    value:number,
    onChange : (value:number) => void,
    min?:number,
    max?:number

}
const PassengerSelector = ({value, onChange, min=1, max=6}:PassengerSelectorProps) => {
    const decrease = () => {
     if(value > min) {
        onChange(value - 1);
     }
    }  
    const increase = () => {
    if(value < 0) {
        onChange(value + 1);
    }
    } 
    return (
    <div>PassengerSelector</div>
  )
}

export default PassengerSelector