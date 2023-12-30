/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link"
import Footer from "../../components/frontend/Footer"
import Navbar from "../../components/frontend/Navbar"

export default function Service(props) {
  return (
    <>
      <Navbar />

      {/* banner starts */}
      <div className='w-100 bg-banner'>
        <div className="fs-1 d-flex align-items-center justify-content-center gap-3 w-100">
            <div><Link href='/' className="text-decoration-none text-dark fw-bold">Home</Link></div>
            <div>/</div>
            <div>Service</div>
        </div>
      </div>
      {/* banner ends */}

      {/* section 2 starts */}
      <div className="w-100 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-justify">
              <div className="my-4 fs-4">
                PN INFOSYS is a leading global business consulting and IT service company. We provides a full range of maintenance and compliance services for Government and Commercial facilities both large and small. Whether you need to run your business more efficiently or accelerate revenue growth, PN INFOSYS can get you there. Our team is proficient enough to provide all the IT services, which a customer needs in an affordable rates. We make sure our clients are happy at the end of the day.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section 2 ends */}

      {/* section 1 starts */}
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-3 mt-4">
            <div className='card-body-custom'>
              <center>
                <div className='card-img-custom'>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Efeature%2Fcollaborative1.jpg?alt=media&token=b8ce06a7-a1c9-41e7-a4ed-3e65be127f11" className='w-100' alt="" />
                </div>
                <div className='my-3 fs-5'>Collaborative Spirit</div>
                <div>We believe in developing true partnerships and making clients happy.</div>
              </center>
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <div className='card-body-custom'>
              <center>
                <div className='card-img-custom'>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Efeature%2Fthinking.png?alt=media&token=a4d7e55a-cc39-443b-bcbc-92921ae35f6a" className='w-100' alt="" />
                </div>
                <div className='my-3 fs-5'>Expert Thinking</div>
                <div>We brings robust skill and forward looking perspectives to solve customer challenges.</div>
              </center>
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <div className='card-body-custom'>
              <center>
                <div className='card-img-custom'>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Efeature%2Fdedication.jpg?alt=media&token=2b6177d8-816a-45d8-acec-ca235232235e" className='w-100' alt="" />
                </div>
                <div className='my-3 fs-5'>Exorbitant Dedication</div>
                <div>PN Infosys is driven to meet client needs with determination and grit.</div>
              </center>
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <div className='card-body-custom'>
              <center>
                <div className='card-img-custom'>
                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Efeature%2Ftraining.png?alt=media&token=9f731de1-607f-4ce5-999b-3b5b940a78ae" className='w-100' alt="" />
                </div>
                <div className='my-3 fs-5'>Industrial Training</div>
                <div>We provide free Industrial Internship to novice undergratuates.</div>
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
