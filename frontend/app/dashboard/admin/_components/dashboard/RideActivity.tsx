import React from 'react'

const RideActivity = () => {
    const data = [
        { label: "Ongoing", value: 315, color: "#1D9E75" },
        { label: "Completed", value: 2850, color: "#9CA3AF" },
        { label: "Cancelled", value: 42, color: "#EF4444" },
        { label: "Pending Requests", value: 89, color: "#9CA3AF" },
    ];

  const max = Math.max(...data.map(d => d.value))


    return <div className='bg-white rounded-2xl grid col-span-1 p-4 items-center shadow-sm'>
        <h2 className="text-lg font-semibold mb-5">Ride Activity Overview</h2>
        <div className='flex flex-col gap-5 '>
            {
                data.map(({label, value, color}) => {
                    const pct = (value / max) * 100;
                    return(
                        <div key={label}>
                            <div className="flex justify-between mb-1.5">
                                <span className='text-sm text-(--neutral)'>{label}</span>
                                <span className='text-sm font-medium'>{value}</span>

                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className='h-full rounded-full' style={{width:`${pct}%`, backgroundColor:color}}></div>
                            </div>
                        </div>
                    )
                }

                )
            }
        </div>

    </div>
}

export default RideActivity