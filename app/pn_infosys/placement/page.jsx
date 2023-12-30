/* eslint-disable @next/next/no-img-element */
'use client'
import Footer from '@/app/components/frontend/Footer'
import Navbar from '@/app/components/frontend/Navbar'
import Link from 'next/link'
import React from 'react'

const Placement = () => {
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
                    <div className="col-md-3 mt-4">
                        <div className='card-body-custom'>
                            <center>
                                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/traning%2Fcase3.jpg?alt=media&token=cc2f60c1-f87a-4c58-8106-93094e670db5" className='rounded max-width-100 max-height-250px' alt="" />
                                <div className='fs-4 my-3'>Student Name</div>
                                <div>Student Name placed in Company Name as a Full Stack Developer</div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            {/* section 1 ends */}

            <Footer />
        </>
    )
}

export default Placement