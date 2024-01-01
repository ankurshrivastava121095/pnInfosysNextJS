'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import OneStepBreadcrumbs from '../AdminComponents/BreadCrumbs/OneStepBreadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { createPlacement, deletePlacement, getPlacements, resetPlacementState } from '@/app/Features/Placement/PlacementSlice'
import LoaderLarge from '@/app/components/Loader/LoaderLarge'
import LoaderMini from '@/app/components/Loader/LoaderMini'

const PlacementList = () => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)    
    const [data, setData] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [designation, setDesignation] = useState('');
    const [studentImage, setStudentImage] = useState('');
    const [showAddStudentModal, setShowAddStudentModal] = useState(false)
    const [showMessageModal, setshowMessageModal] = useState(false)

    const { placements, responseStatus, responseMessage } = useSelector((state) => state.placements)

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    const fetchStudents = () => {
        setIsLoading(true)
        dispatch(getPlacements())
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = useMemo(() => {
        const filteredSlice = data.filter((item) => (
            item.studentName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item.companyName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item.designation?.toLowerCase()?.includes(searchTerm.toLowerCase())
        ));
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        return filteredSlice.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage, searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        const formdata = new FormData()
        formdata.set('studentName', studentName)
        formdata.set('companyName', companyName)
        formdata.set('designation', designation)
        formdata.set('studentImage', studentImage)

        dispatch(createPlacement(formdata));
    }

    const handleDelete = (id) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this student?');

        if (shouldDelete) {
            setIsLoading(true);
            dispatch(deletePlacement(id));
        }
    }

    const closeModal = () => {
        setStudentName('')
        setCompanyName('')
        setDesignation('')
        dispatch(resetPlacementState());
        setshowMessageModal(false);
        fetchStudents()
    };

    useEffect(()=>{
        fetchStudents()
    },[])

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == 'Placement created successfully')) {
            setIsLoading(false)
            setShowAddStudentModal(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == 'Placement deleted successfully')) {
            setIsLoading(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            setData(placements)
        }
        if ((responseStatus == 'rejected')) {
            setIsLoading(false)
            setshowMessageModal(true)
        }
    },[responseStatus,responseMessage])

    return (
        <>
            <OneStepBreadcrumbs 
                currentPageName='Placement Management'
            />
            <div className='bodySection'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='fs-5'>Placed Student List</div>
                    <button className='btn btn-sm btn-custom' onClick={() => setShowAddStudentModal(true)}><i className="fa-solid fa-plus"></i> Add New</button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            isLoading ?
                            <LoaderLarge />
                            :
                            <>
                                <input 
                                    type="search"
                                    className='form-control form-control-sm mt-2 mb-3 w-250px'
                                    placeholder='Search'
                                    value={searchTerm}
                                    onChange={handleSearchChange} 
                                />
                                <div className='overflowX-auto'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>#</th>
                                                <th>NAME</th>
                                                <th>PLACED IN</th>
                                                <th>ROLE/DESIGNATION</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Array?.isArray(filteredData) && filteredData?.map((val,key)=>(
                                                    <tr key={key}>
                                                        <td>{key+1}.</td>
                                                        <td>
                                                            <img src={`/upload/${val?.studentImage}`} className='tableImage rounded' alt={val?.studentImage?.url} />
                                                        </td>
                                                        <td>{val?.studentName}</td>
                                                        <td>{val?.companyName}</td>
                                                        <td>{val?.designation}</td>
                                                        <td>
                                                            <button type='button' className='btn btn-sm btn-custom' title='Delete' onClick={() => handleDelete(val?._id)}><i className="fa-solid fa-trash-can"></i></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>Page {currentPage} of {totalPages}</div>
                                    <div className='d-flex align-items-center gap-3'>
                                        <button className='btn btn-sm btn-custom rounded-circle' title='Previous' onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}><i className="fa-solid fa-arrow-left"></i></button>
                                        <button className='btn btn-sm btn-custom rounded-circle' title='Next' onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}><i className="fa-solid fa-arrow-right"></i></button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>

            {/* add student modal */}
            <div
                className={`modal fade${showAddStudentModal ? ' show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showAddStudentModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Student</h1>
                            <button type="button" className="btn-close" onClick={() => setShowAddStudentModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <input 
                                type="text"
                                name='studentName'
                                className='form-control form-control-sm mb-3'
                                placeholder='Student Name'
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)} 
                            />
                            <input 
                                type="text"
                                name='companyName'
                                className='form-control form-control-sm mb-3'
                                placeholder='Company Name'
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)} 
                            />
                            <input 
                                type="text"
                                name='designation'
                                className='form-control form-control-sm mb-3'
                                placeholder='Designation'
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)} 
                            />
                            <input 
                                type="file"
                                name='studentImage'
                                className='form-control form-control-sm'
                                onChange={(e) => setStudentImage(e.target.files[0])} 
                            />
                        </div>
                        <div className="modal-footer">
                            {
                                isLoading ?
                                <LoaderMini />
                                :
                                <button type="button" className="btn btn-custom btn-sm" onClick={handleSubmit}>Save</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

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

export default PlacementList