/* eslint-disable @next/next/no-img-element */
'use client'
import Footer from '@/app/components/frontend/Footer'
import Navbar from '@/app/components/frontend/Navbar'
import Link from 'next/link'

export default function Event(props) {
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
        <div className="container mt-4 mb-4">
            <div className='fs-6 text-center'>Event Title</div>
            <div className='fs-4 text-center'>Short Description</div>
            <div className="row">
                <div className="col-md-4 mt-4">
                    <div className='card-body-custom'>
                        <center>
                            <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Eclient%2Fe1.jpg?alt=media&token=e6e44a43-8e57-4d03-a8c5-5c120f33f9f0" className='rounded max-width-100 max-height-250px' alt="" />
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
