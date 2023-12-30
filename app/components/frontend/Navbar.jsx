/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-nav">
                <div className="container">
                    <Link href={'/'} className="navbar-brand fw-bold text-white">
                        <img src="/pninfosysNavbarLogo.png" className='w-50 bg-white p-1 rounded' alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars-staggered text-white"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href={'/'} className="nav-link text-white active" aria-current="page"><i className="fa-solid fa-house-chimney"></i></Link>
                            </li>
                            <li className="nav-item">
                                <Link href={'/pn_infosys/about'} className="nav-link text-white">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link href={'/pn_infosys/service'} className="nav-link text-white">Service</Link>
                            </li>
                            <li className="nav-item">
                                <Link href={'/pn_infosys/training'} className="nav-link text-white">Training</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Workshop
                                </div>
                                <ul className="dropdown-menu">
                                    <li><Link href={`/pn_infosys/workshop/1`} className="dropdown-item">Dummy</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Events
                                </div>
                                <ul className="dropdown-menu">
                                    <li><Link href={`/pn_infosys/event/1`} className="dropdown-item">Dummy</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link href={'/pn_infosys/placement'} className="nav-link text-white">Placement</Link>
                            </li>
                            <li className="nav-item">
                                <Link href={'/pn_infosys/contact_us'} className="nav-link text-white">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <a href="https://pninfosys.in/courses" target="_blank" rel="noopener noreferrer" className="nav-link text-white">Internship Registration</a>
                            </li>
                            <li className="nav-item">
                                <Link href={'/pn_infosys/login'} className="nav-link text-white">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar