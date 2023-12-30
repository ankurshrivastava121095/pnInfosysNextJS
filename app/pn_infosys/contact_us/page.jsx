/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link"
import Footer from "../../components/frontend/Footer"
import Navbar from "../../components/frontend/Navbar"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createContact, resetContactState } from "@/app/Features/Contact/ContactSlice"
import LoaderMini from "@/app/components/Loader/LoaderMini"

export default function ContactUs(props) {

    const dispatch = useDispatch()

    const fields = {
        name: '',
        email: '',
        phone: '',
        message: '',
    }

    const [data, setData] = useState(fields)
    const [loading, setLoading] = useState(false)
    const [showMessageModal, setshowMessageModal] = useState(false)

    const { contacts, responseStatus, responseMessage } = useSelector((state) => state.contacts)

    const closeModal = () => {
        setData({
            name: '',
            email: '',
            phone: '',
            message: '',
        })
        dispatch(resetContactState());
        setshowMessageModal(false);
    };
  
    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
  
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(createContact(data))
    }
    
    useEffect(()=>{
        if (responseStatus == 'success' && responseMessage == 'Message Sent Successfully') {
            setLoading(false)
            setshowMessageModal(true)
        }
        if (responseStatus == 'rejected') {
            setLoading(false)
            setshowMessageModal(true)
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
                    <div>Contact Us</div>
                </div>
            </div>
            {/* banner ends */}

            {/* section 2 starts */}
            <div className="container mt-4 mb-4">
                <div className='fs-1 text-center'>Get In Touch with Us</div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 mt-4">
                        <div className='card-body-custom'>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                       <div className="mb-3">
                                        <input 
                                                type="text" 
                                                className="form-control"
                                                placeholder="Your Name"
                                                name="name"
                                                value={data?.name}
                                                onChange={handleInput}
                                            />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="mb-3">
                                        <input 
                                                type="text" 
                                                className="form-control"
                                                placeholder="Your Phone"
                                                name="phone"
                                                value={data?.phone}
                                                onChange={handleInput}
                                            />
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                       <div className="mb-3">
                                        <input 
                                                type="text" 
                                                className="form-control"
                                                placeholder="Your Email"
                                                name="email"
                                                value={data?.email}
                                                onChange={handleInput}
                                            />
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                       <div className="mb-3">
                                            <textarea 
                                                rows="5"
                                                className="form-control"
                                                placeholder="Your Message"
                                                name="message" 
                                                value={data?.message}
                                                onChange={handleInput}
                                            ></textarea>
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                        {
                                            !loading ?
                                                <button type="submit" className="btn btn-custom w-100"><i className="fa-solid fa-paper-plane"></i> Send Message</button>
                                            :
                                                <LoaderMini />
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='card-body-custom mt-4'>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.6195416070777!2d78.2044167752465!3d26.209051877073588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c33b858c5b37%3A0x6627a777c150378c!2sAdarsh%20Books%20%26%20Stationary!5e0!3m2!1sen!2sin!4v1703917820701!5m2!1sen!2sin" 
                                width="100%" 
                                height="350" 
                                style={{border:'0'}} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
            {/* section 2 ends */}

            <Footer />

            {/* Success Modal */}
            <div
                className={`modal fade${showMessageModal ? ' show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showMessageModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <div className="modal-title" id="successModalLabel">
                                <div className={`${responseStatus == 'success' ? 'success' : 'failed'}-icon`}>
                                    {
                                        responseStatus == 'success' ?
                                        <i className="fa-solid fa-thumbs-up"></i>
                                        :
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="fs-4 text-center">{responseMessage}</div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                className={`btn btn-${responseStatus == 'success' ? 'success' : 'danger'} btn-sm`}
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
