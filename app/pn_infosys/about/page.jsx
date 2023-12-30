/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link"
import Footer from "../../components/frontend/Footer"
import Navbar from "../../components/frontend/Navbar"

export default function About(props) {
  return (
    <>
      <Navbar />

      {/* banner starts */}
      <div className='w-100 bg-banner'>
        <div className="fs-1 d-flex align-items-center justify-content-center gap-3 w-100">
            <div><Link href='/' className="text-decoration-none text-dark fw-bold">Home</Link></div>
            <div>/</div>
            <div>About Us</div>
        </div>
      </div>
      {/* banner ends */}

      {/* section 2 starts */}
      <div className="w-100 py-5 mt-5" style={{ background: '#FCE09B' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-justify">
              <div className='fs-1'>Who We Are?</div>
              <div className="my-4">
                We are a one-stop destination for all digital solution, be it website designing,web development, digital marketing, SEO, mobile apps and full maintenance and compliance services for Government and Commercial facilities both large and small.. Our elegant group of Developers provide their innovation who transform your idea into an amazing website Design or Mobile App Development while keeping every custom project unique.
              </div>
              <div className="my-4">
                We are part of this IT industry since 2018, we not only developed products and websites but also provides internship and trainning to students and make them capable to work in this It software industry, our internship and trainning program is totally based on hand to hand pratical with live projects.
              </div>
              <div className="my-4">
                Our team of IT professionals certified professionals services Dental Offices, Medical Offices, Restaurants, Bars and all types of businesses throughout the Lowcountry and the world. Our team of IT professionals certified professionals services Hosptials, Colleges, Research Institutes, Schools, Restaurants, Bars and all types of businesses throughout the Lowcountry and the world.
              </div>
            </div>
            <div className="col-md-6">
              <div className='section-two-icon'>
                <div className='text-center'>
                  {/* <i className="fa-solid fa-code fa-beat-fade"></i> */}
                  {/* <i className="fa-solid fa-question fa-beat-fade text-danger"></i> */}
                  <img src="/businessTeam.png" className='codingStudent w-100' alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section 2 ends */}

      {/* section 3 starts */}
      <div className="container mt-4 mb-4">
        <div className='fs-1 text-center'>Our Team</div>
        <div className="row">
          <div className="col-md-4 mt-4">
            <div className='card-body-custom'>
              <center>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Eclient%2Fe1.jpg?alt=media&token=e6e44a43-8e57-4d03-a8c5-5c120f33f9f0" className='rounded max-width-100 max-height-250px' alt="" />
                <div className='fs-4 my-3'>Vikas Jain</div>
                <div>Chairman</div>
              </center>
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className='card-body-custom'>
              <center>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Eclient%2Fe1.jpg?alt=media&token=e6e44a43-8e57-4d03-a8c5-5c120f33f9f0" className='rounded max-width-100 max-height-250px' alt="" />
                <div className='fs-4 my-3'>Vikas Jain</div>
                <div>Chairman</div>
              </center>
            </div>
          </div>
        </div>
      </div>
      {/* section 3 ends */}

      <Footer />
    </>
  )
}
