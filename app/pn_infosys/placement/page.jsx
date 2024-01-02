/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { getPlacements } from '@/app/Features/Placement/PlacementSlice'
import LoaderLarge from '@/app/components/Loader/LoaderLarge'
import Footer from '@/app/components/frontend/Footer'
import Navbar from '@/app/components/frontend/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Placement = () => {

    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { placements, responseStatus, responseMessage } = useSelector((state) => state.placements)

    useEffect(()=>{
        dispatch(getPlacements())
    },[])

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            setData(placements)
        }
    },[responseStatus,responseMessage])

    return (
        <>
            <Navbar />

            {/* banner starts */}
            <div className='w-100 bg-banner'>
                <div className="fs-1 d-flex align-items-center justify-content-center gap-3 w-100">
                    <div><Link href='/' className="text-decoration-none text-dark fw-bold">Home</Link></div>
                    <div>/</div>
                    <div>Placement</div>
                </div>
            </div>
            {/* banner ends */}

            {/* section 1 starts */}
            <div className="container mt-4 mb-4">
                <div className='fs-1 text-center'>OUR PLACED STUDENTS</div>
                <div className="row">
                    {
                        isLoading ?
                        <LoaderLarge />
                        :
                        data?.length > 0 ?
                        Array?.isArray(data) && data?.map((val,key)=>(
                            <div key={key} className="col-md-3 mt-4">
                                <div className='card-body-custom'>
                                    <center>
                                        <img src={`/upload/${val?.studentImage}`} className='rounded max-width-100 max-height-250px' alt="" />
                                        <div className='fs-4 mt-3 mb-1'>{val?.studentName}</div>
                                        <div>PNINFOSYS congratulates {val?.studentName} to get placed in {val?.companyName} as a {val?.designation}</div>
                                    </center>
                                </div>
                            </div>
                        ))
                        :
                        <><center><div className='my-3'>No Record</div></center></>
                    }
                </div>
            </div>
            {/* section 1 ends */}

            <Footer />
        </>
    )
}

export default Placement