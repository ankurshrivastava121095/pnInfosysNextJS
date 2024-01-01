import Link from 'next/link'
import React from 'react'

const TwoStepBreadcrumbs = ({ currentPageName, previousPageName, previousPageLink }) => {
    return (
        <>
            <div className='bodySection'>
                <div className='fs-4'>{currentPageName}</div>
                <div className='d-flex align-items-center gap-2'>
                    <small><Link href='/admin/dashboard' className='text-decoration-none'>Dashboard</Link></small>
                    <small>/</small>
                    <small><Link href={{previousPageLink}} className='text-decoration-none'>{previousPageName}</Link></small>
                    <small>/</small>
                    <small>{currentPageName}</small>
                </div>
            </div>
        </>
    )
}

export default TwoStepBreadcrumbs