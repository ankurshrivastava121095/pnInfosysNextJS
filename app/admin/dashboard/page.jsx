'use client'
import React from 'react'
import TwoStepBreadcrumbs from '../AdminComponents/BreadCrumbs/TwoStepBreadcrumbs'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <>
            <div className='bodySection'>
                <div className='fs-4'>Dashboard</div>
                <small>Dashboard</small>
            </div>
            <div className='bodySection'>
                <div className='row'>
                    <div className="col-md-3">
                        <Link href='/admin/placement' className='text-white text-decoration-none'>
                            <div className='bg-dash-boxes py-2 my-2'>
                                <center>
                                    <i className="fa-solid fa-thumbs-up fs-2"></i>
                                    <div className='fs-5'>Placement</div>
                                </center>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link href='/admin/workshop' className='text-white text-decoration-none'>
                            <div className='bg-dash-boxes py-2 my-2'>
                                <center>
                                    <i className="fa-solid fa-person-chalkboard fs-2"></i>
                                    <div className='fs-5'>Workshop</div>
                                </center>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link href='/admin/event' className='text-white text-decoration-none'>
                            <div className='bg-dash-boxes py-2 my-2'>
                                <center>
                                    <i className="fa-solid fa-calendar-days fs-2"></i>
                                    <div className='fs-5'>Event</div>
                                </center>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link href='/admin/contact' className='text-white text-decoration-none'>
                            <div className='bg-dash-boxes py-2 my-2'>
                                <center>
                                    <i className="fa-solid fa-message fs-2"></i>
                                    <div className='fs-5'>Contact</div>
                                </center>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard