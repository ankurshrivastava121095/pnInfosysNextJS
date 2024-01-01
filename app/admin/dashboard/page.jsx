import React from 'react'
import TwoStepBreadcrumbs from '../AdminComponents/BreadCrumbs/TwoStepBreadcrumbs'

const Dashboard = () => {
    return (
        <>
            <div className='bodySection'>
                <div className='fs-4'>Dashboard</div>
                <small>Dashboard</small>
            </div>
            <div className='bodySection'>
                <div className='fs-3'>Collapsed Sidebar</div>
                <div>Click on the hamburger menu/bar icon to open the sidebar, and push this content to the right.</div>
            </div>
        </>
    )
}

export default Dashboard