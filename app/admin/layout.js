/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'
/* eslint-disable @next/next/no-css-tags */
import { Inter } from 'next/font/google'
import '../globals.css'
import { Provider } from 'react-redux'
import { store } from '../Store'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthSecurity from './AdminComponents/AuthSecurity'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = typeof window !== "undefined"
//   ? null
//   : 
//   {
//     title: 'PNINFOSYS',
//     description: 'Created on NEXTJS',
//   }

export default function AdminLayout({ children }) {

    const router = useRouter()

    const [toggleSidebar, setToggleSidebar] = useState(true)
    const [loggedInUser, setLoggedInUser] = useState('')
    const [selectedMenu, setSelectedMenu] = useState('')

    const handleLogout = () => {
        localStorage.removeItem('userData')
        localStorage.removeItem('userToken')
        window.location.reload();
        router.push('/')
    }
     useEffect(()=>{
        setSelectedMenu('dashboard')
        const isUserExist = localStorage.getItem('userData')
        if (isUserExist) {
            setLoggedInUser(JSON.parse(isUserExist))
        }
     },[])

    return (
        <>
            <AuthSecurity />
            <html lang="en">
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossOrigin="anonymous" async />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossOrigin="anonymous" async />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                </head>
                <body className={inter.className}>
                    <Provider store={store}>
                    <div id="mySidebar" className="sidebar" style={toggleSidebar ? {width : '320px'} : {width: '0'}}>
                        <center><img src='/pninfosysNavbarLogo.png' className='w-75' /></center>
                        <br />
                        <Link href="/admin/dashboard" className={selectedMenu == 'dashboard' ? 'activeSelectedMenu' : ''} onClick={() => setSelectedMenu('dashboard')}><i className="fa-solid fa-gauge-high"></i> Dashboard</Link>
                        <Link href="/admin/placement" className={selectedMenu == 'placement' ? 'activeSelectedMenu' : ''} onClick={() => setSelectedMenu('placement')}><i className="fa-solid fa-thumbs-up"></i> Placement Management</Link>
                        <Link href="/admin/workshop" className={selectedMenu == 'workshop' ? 'activeSelectedMenu' : ''} onClick={() => setSelectedMenu('workshop')}><i className="fa-solid fa-person-chalkboard"></i> Workshop Management</Link>
                        <Link href="/admin/event" className={selectedMenu == 'event' ? 'activeSelectedMenu' : ''} onClick={() => setSelectedMenu('event')}><i className="fa-solid fa-calendar-days"></i> Event Management</Link>
                        <Link href="/admin/contact" className={selectedMenu == 'contact' ? 'activeSelectedMenu' : ''} onClick={() => setSelectedMenu('contact')}><i className="fa-solid fa-message"></i> Contact Management</Link>
                    </div>

                    <div id="main" style={toggleSidebar ? {marginLeft : '320px'} : {marginLeft: '0'}}>
                        <div className='headerSection d-flex align-items-center justify-content-between'>
                            <button className="openbtn btn btn-custom m-2" onClick={() => setToggleSidebar(!toggleSidebar)}><i className="fa-solid fa-bars-staggered"></i></button> 
                            <div className="dropdown">
                                <button className="btn dropdown-toggle headerAdminName" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {loggedInUser?.firstName} {loggedInUser?.lastName}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><span role='button' className="dropdown-item" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</span></li>
                                </ul>
                            </div> 
                        </div>
                        {children}
                    </div>
                    </Provider>
                </body>
            </html>
        </>
    )
}
