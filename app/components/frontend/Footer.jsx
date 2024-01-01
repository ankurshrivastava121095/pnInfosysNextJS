/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="w-100 bg-nav">
                <div className="container text-white">
                    <div className="row">
                        <div className="col-md-4 mt-5">
                            {/* <img src="/pninfosysFooterLogo.png" className='w-100 bg-white p-1 rounded' alt="" /><br /><br /> */}
                            <img src="/pninfosysFooterLogo.png" className='w-100 p-1 rounded' alt="" /><br /><br />
                            <div className='text-justify'>PN INFOSYS is a leading global business consulting and IT service company. We provides a full range of maintenance and compliance services for Government and Commercial facilities both large and small. Whether you need to run your business more efficiently or accelerate revenue growth, PN INFOSYS can get you there.</div>
                            <div className='d-flex flex-nowrap align-items-center justify-content-center gap-3'>
                                <Link href='https://www.facebook.com/pninfosys/' className='text-decoration-none text-white fs-1'><i className="fa-brands fa-facebook"></i></Link>
                                <Link href='https://www.linkedin.com/company/pninfosys/' className='text-decoration-none text-white fs-1'><i className="fa-brands fa-linkedin"></i></Link>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <center>
                                <h4>Get in Touch</h4><br />
                                <div><i className="fa-solid fa-envelope"></i> www.pninfosys.com</div>
                                <div><i className="fa-solid fa-envelope"></i> support@pninfosys.com</div><br />
                                <div><i className="fa-solid fa-phone"></i> +91 7000846823</div>
                                <div><i className="fa-solid fa-phone"></i> +91 7415289378</div><br />
                                <div><i className="fa-solid fa-location-dot"></i> MIG-332,<br />Darpan Colony,Thatipur,<br />Gwalior,Madhya Pradesh</div>
                            </center>
                        </div>
                        <div className="col-md-4 mt-5">
                            <center>
                                <h4>COMPANIES WORKSHOP</h4><br />
                                <small>Xiaomi MI Company</small>
                                <div>August 20 / Mr.Vaibhav Shrivastava</div><br />
                                <small>Bentchair Company</small>
                                <div>October 06 / Mr.Nicket Bansal</div><br />
                                <small>MPCT College Gwalior</small>
                                <div>November 02 / PN Infosys Team</div><br />
                                <small>RJIT College Tekanpur</small>
                                <div>Febuary 24 / PN Infosys Team</div><br />
                            </center>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                <div className='my-4'>
                                    Copyright © 2020 | <span className='fw-bold'>PN INFOSYS IT COMPANY IN GWALIOR</span> ! . All rights reserved.
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default Footer