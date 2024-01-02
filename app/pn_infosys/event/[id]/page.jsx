/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import LoaderLarge from '@/app/components/Loader/LoaderLarge'
import Footer from '@/app/components/frontend/Footer'
import Navbar from '@/app/components/frontend/Navbar'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Event(event) {

    const eventID = event?.params?.id

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL_ENDPOINT}/eventImage/${eventID}`)
        .then((res)=>res.json())
        .then((result)=>{
            setIsLoading(false)
            setData(result)
        })
    },[])

    return (
        <>
            <Navbar />

            {/* banner starts */}
            <div className='w-100 bg-banner'>
                <div className="fs-1 d-flex align-items-center justify-content-center gap-3 w-100">
                    <div><Link href='/' className="text-decoration-none text-dark fw-bold">Home</Link></div>
                    <div>/</div>
                    <div>Event</div>
                </div>
            </div>
            {/* banner ends */}

            {/* section 1 starts */}
            {
                isLoading ?
                <LoaderLarge />
                :
                <div className="container mt-4 mb-4">
                    <div className='fs-6 text-center'>{data?.event?.eventTitle}</div>
                    <div className='fs-4 text-center'>{data?.event?.eventShortDescription}</div>
                    <div className="row">
                        {
                            data?.eventImages?.length > 0 ?
                            Array?.isArray(data?.eventImages) && data?.eventImages?.map((val,key)=>(
                                <div key={key} className="col-md-4 mt-4">
                                    <div className='card-body-custom'>
                                        <center>
                                            <img src={`/upload/${val?.eventImage}`} className='rounded max-width-100 max-height-250px' alt={`/upload/${val?.eventImage}`} />
                                        </center>
                                    </div>
                                </div>
                            ))
                            :
                            <><center><div className='my-3'>No Images</div></center></>
                        }
                    </div>
                </div>
            }
            {/* section 1 ends */}

            <Footer />
        </>
    )
}
