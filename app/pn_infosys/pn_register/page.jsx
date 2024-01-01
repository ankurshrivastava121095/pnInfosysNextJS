'use client'
/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import Footer from "../../components/frontend/Footer"
import Navbar from "../../components/frontend/Navbar"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoaderMini from "@/app/components/Loader/LoaderMini"
import { registerUser, resetAuthState } from "@/app/Features/Auth/AuthSlice"
import GuestSecurity from "@/app/components/GuestSecurity"

export default function PnRegister(props) {

    const dispatch = useDispatch()

    const fields = {
        firstName: '',
        lastName: '',
        userName: '',
        phone: '',
        email: '',
        password: '',
    }

    const [data, setData] = useState(fields)
    const [loading, setLoading] = useState(false)
    const [passwordType, setPasswordType] = useState(false)
    const [showMessageModal, setshowMessageModal] = useState(false)

    const { auth, success, message } = useSelector((state) => state.auth)

    const closeModal = () => {
        setData({
            firstName: '',
            lastName: '',
            userName: '',
            phone: '',
            email: '',
            password: '',
        })
        dispatch(resetAuthState());
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
        dispatch(registerUser(data))
    }
    
    useEffect(()=>{
        if (success == true && message == 'Registered Successfully') {
            setLoading(false)
            setshowMessageModal(true)
        }
        if (success == false) {
            setLoading(false)
            setshowMessageModal(true)
        }
        if (message == null) {
            setLoading(false)
            setshowMessageModal(false)
        }
    },[success,message])

    return (
        <>
            <GuestSecurity />
            <Navbar />

            {/* banner starts */}
            <div className='w-100 bg-banner'>
                <div className="fs-1 d-flex align-items-center justify-content-center gap-3 w-100">
                    <div><Link href='/' className="text-decoration-none text-dark fw-bold">Home</Link></div>
                    <div>/</div>
                    <div>Register</div>
                </div>
            </div>
            {/* banner ends */}

            {/* section 2 starts */}
            <div className="container mt-4 mb-4">
                <div className='fs-1 text-center'>Admin Registration</div>
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
                                                placeholder="First Name"
                                                name="firstName"
                                                value={data?.firstName}
                                                onChange={handleInput}
                                            />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="mb-3">
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={data?.lastName}
                                                onChange={handleInput}
                                            />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="mb-3">
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                placeholder="Username"
                                                name="userName"
                                                value={data?.userName}
                                                onChange={handleInput}
                                            />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="mb-3">
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                placeholder="Phone"
                                                name="phone"
                                                value={data?.phone}
                                                onChange={handleInput}
                                            />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="mb-3">
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                placeholder="Email"
                                                name="email"
                                                value={data?.email}
                                                onChange={handleInput}
                                            />
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input 
                                                type={passwordType ? 'text' : 'password'} 
                                                className="form-control"
                                                placeholder="Password"
                                                name="password"
                                                value={data?.password}
                                                onChange={handleInput}
                                            />
                                            <small role="button" onClick={()=>setPasswordType(!passwordType)}>
                                                {
                                                   passwordType ?
                                                   <><i className="fa-regular fa-eye-slash"></i> Hide</>
                                                   : 
                                                   <><i className="fa-regular fa-eye"></i> Show</>
                                                } Password
                                            </small>
                                       </div>
                                    </div>
                                    <div className="col-md-12">
                                        {
                                            !loading ?
                                                <button type="submit" className="btn btn-custom w-100"><i className="fa-solid fa-circle-plus"></i> Register</button>
                                            :
                                                <LoaderMini />
                                        }
                                    </div>
                                </div>
                            </form>
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
                                <div className={`${success == true ? 'success' : 'failed'}-icon`}>
                                    {
                                        success == true ?
                                        <i className="fa-solid fa-thumbs-up"></i>
                                        :
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="fs-4 text-center">{message}</div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                className={`btn btn-${success == true ? 'success' : 'danger'} btn-sm`}
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
