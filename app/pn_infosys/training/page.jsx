/* eslint-disable @next/next/no-img-element */
'use client'
import Footer from '@/app/components/frontend/Footer'
import Navbar from '@/app/components/frontend/Navbar'
import Link from 'next/link'
import React from 'react'

const Training = () => {
    return (
        <>
            <Navbar />

            {/* banner starts */}
            <div className='w-100 bg-banner'>
                <div className="fs-1 d-flex align-items-center justify-content-center gap-3 w-100">
                    <div><Link href='/' className="text-decoration-none text-dark fw-bold">Home</Link></div>
                    <div>/</div>
                    <div>Training</div>
                </div>
            </div>
            {/* banner ends */}

            {/* section 1 starts */}
            <div className="w-100 py-5 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className='fs-1'>Helping Hands</div>
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <div className='text-justify'>We have capability to train even novice students, students who don’t have any experience with coding can work efficiently in our training sessions. We need only adamant students who are disciplined enough to pay attention and have that urge in them for learning new things. You will have the experience to work on Live Projects, which will ameliorate your portfolio. Basically through these training sessions, we want to help students to grow, Our training sessions are helping hands for adamant students.</div>
                                    <br />
                                    <div className='text-justify'>At our institution, we take pride in our unique ability to nurture talent from the ground up. Our training program is tailor-made for novice students, welcoming individuals who may not have any prior coding experience. Our belief is simple – with the right guidance, anyone can become proficient in the world of coding.</div>
                                    <br />
                                    <div className='text-justify'>Our training sessions are crafted to be inclusive and effective, ensuring that even those new to coding can participate meaningfully. We provide hands-on experience with Live Projects, offering a unique opportunity to enhance your portfolio. Through these projects, you won&apos;t just learn theory – you&apos;ll apply your skills in real-world scenarios.</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className='section-two-icon'>
                                <div className='text-center'>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/home-%3Eservices%2Fe-learning.png?alt=media&token=71eaebcc-1041-4891-bb3d-68cc30b0173b" className='codingStudent w-100' alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* section 1 ends */}

            {/* section 2 starts */}
            <div className="container mt-4 mb-4">
                <div className='fs-1 text-center'>What will you Learn</div>
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <div className='card-body-custom' style={{ height: '450px' }}>
                            <center>
                                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/traning%2Fcase3.jpg?alt=media&token=cc2f60c1-f87a-4c58-8106-93094e670db5" className='rounded max-width-100 max-height-250px' alt="" />
                                <div className='fs-4 my-3'>Learn HTML, CSS, Bootstrap, Javascript, Wordpress</div>
                                <div>45 Days to Complete</div>
                            </center>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className='card-body-custom' style={{ height: '450px' }}>
                            <center>
                                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/traning%2Fcase1.jpg?alt=media&token=3ce1d0a6-96d7-4a52-af86-0843364f3d5f" className='rounded max-width-100 max-height-250px' alt="" />
                                <div className='fs-4 my-3'>Learn MySQL, Core PHP, OOPS, Laravel</div>
                                <div>60 Days to Complete</div>
                            </center>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className='card-body-custom' style={{ height: '450px' }}>
                            <center>
                                <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/traning%2Fcase2.jpg?alt=media&token=760e9692-2081-4b5e-b4eb-34b8e18ac041" className='rounded max-width-100 max-height-250px' alt="" />
                                <div className='fs-4 my-3'>Javescript, Angular, React Js, Node Js, React Native, Restfull API, Mongo DB, Git, AWS</div>
                                <div>90 Days to Complete</div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            {/* section 2 ends */}

            {/* section 3 starts */}
            <div className="container my-5">
                <div className="row">
                    <div className='fs-1 text-center'>Internship Experience</div>
                    <div className="col-md-4 mt-4">
                        <div className='card-body-custom'>
                            <center>
                                <div className='card-img-custom'>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/traning%2Fbanner_small.png?alt=media&token=1b4e98d5-531b-4ca7-8b7a-dc305445e62e" className='w-100' alt="" />
                                </div>
                                <div className='my-3 fs-5'>100% Practical Training</div>
                                <div>We don&apos;t use paper and pencil at all in our training sessions.</div>
                            </center>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className='card-body-custom'>
                            <center>
                                <div className='card-img-custom'>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/traning%2Foffice_work_6.png?alt=media&token=3f0fd8a9-3ddf-40ca-8f60-2979a5383414" className='w-100' alt="" />
                                </div>
                                <div className='my-3 fs-5'>Live Projects</div>
                                <div>We make you work on Live projects, in order to strengthen your portfolio.</div>
                            </center>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className='card-body-custom'>
                            <center>
                                <div className='card-img-custom'>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/pn-images.appspot.com/o/traning%2Flaptop_3.png?alt=media&token=27efabb2-bc3a-4d94-8884-104edab73205" className='w-100' alt="" />
                                </div>
                                <div className='my-3 fs-5'>Innovative Ideas</div>
                                <div>We always inbuilt innovation in our training sessions, to learn something new.</div>
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

export default Training