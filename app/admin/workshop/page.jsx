'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import OneStepBreadcrumbs from '../AdminComponents/BreadCrumbs/OneStepBreadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import LoaderLarge from '@/app/components/Loader/LoaderLarge'
import { createWorkshop, deleteWorkshop, getWorkshop, getWorkshops, resetWorkshopState, updateWorkshop } from '@/app/Features/Workshop/WorkshopSlice'
import LoaderMini from '@/app/components/Loader/LoaderMini'
import { createWorkshopImage, resetWorkshopImageState } from '@/app/Features/WorkshopImage/WorkshopImageSlice'
import Link from 'next/link'

const WorkshopList = () => {

    const dispatch = useDispatch()

    const fields = {
        workshopTitle: '',
        workshopShortDescription: '',
    }

    const [postData, setPostData] = useState(fields)
    const [workshopImages, setWorkshopImages] = useState()
    const [isUpdating, setIsUpdating] = useState(false)
    const [workshopId, setWorkshopId] = useState('')
    const [isLoading, setIsLoading] = useState(true)    
    const [data, setData] = useState([]);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false)
    const [showMessageModal, setshowMessageModal] = useState(false)
    const [showAddImageMessageModal, setshowAddImageMessageModal] = useState(false)
    const [showAddImageModal, setShowAddImageModal] = useState(false)

    const { workshops, responseStatus, responseMessage } = useSelector((state) => state.workshops)
    const { workshopImages: workshopImagesFromStore, responseStatus: workshopImagesStatus, responseMessage: workshopImagesMessage } = useSelector((state) => state.workshopImages)

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    const fetchWorkshops = () => {
        setIsLoading(true)
        dispatch(getWorkshops())
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = useMemo(() => {
        const filteredSlice = data.filter((item) => (
            item.workshopTitle?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item.workshopShortDescription?.toLowerCase()?.includes(searchTerm.toLowerCase())
        ));
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        return filteredSlice.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage, searchTerm]);

    const handleInput = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!isUpdating) {
            dispatch(createWorkshop(postData))
        } else {
            const workshopData = {
                _id: workshopId,
                newtitle: postData.workshopTitle,
                newDescription: postData.workshopShortDescription
            }
            dispatch(updateWorkshop(workshopData))
        }
    }

    const handleImageModal = (id) => {
        setWorkshopId(id)
        setShowAddImageModal(true)
    }

    const handleWorkshopImagesSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        const formdata = new FormData()
        formdata.set('workshopId', workshopId)
        formdata.set('workshopImage', workshopImages)

        dispatch(createWorkshopImage(formdata));
    }

    const handleEdit = (id) => {
        setIsLoading(true)
        dispatch(getWorkshop(id))
    }

    const closeModal = () => {
        dispatch(resetWorkshopState());
        setshowMessageModal(false);
        setWorkshopId('')
        setIsUpdating(false)
        fetchWorkshops()
    };

    const closeAddImageModal = () => {
        dispatch(resetWorkshopImageState());
        setshowAddImageMessageModal(false);
        setWorkshopId('')
    };

    useEffect(()=>{
        fetchWorkshops()
    },[])

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == 'Workshop created successfully')) {
            setIsLoading(false)
            setShowAddStudentModal(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == 'Workshop updated successfully')) {
            setIsLoading(false)
            setShowAddStudentModal(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            if (Array?.isArray(workshops)) {
                setData(workshops)
            } else {
                setPostData(workshops?.workshop)
                setWorkshopId(workshops?.workshop?._id)
                setIsUpdating(true)
                setShowAddStudentModal(true)
            }
        }
        if ((responseStatus == 'rejected')) {
            setIsLoading(false)
            setshowMessageModal(true)
        }
    },[responseStatus,responseMessage])

    useEffect(()=>{
        if ((workshopImagesStatus == 'success' && workshopImagesMessage == 'Workshop Image created successfully')) {
            setIsLoading(false)
            setShowAddImageModal(false)
            setshowAddImageMessageModal(true)
        }
        if ((workshopImagesStatus == 'rejected')) {
            setIsLoading(false)
            setshowAddImageMessageModal(true)
        }
    },[workshopImagesStatus,workshopImagesMessage])

    return (
        <>
            <OneStepBreadcrumbs 
                currentPageName='Workshop Management'
            />
            <div className='bodySection'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='fs-5'>Workshop List</div>
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
                                                <th>#</th>
                                                <th>TITLE</th>
                                                <th>DESCRIPTION</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Array?.isArray(filteredData) && filteredData?.map((val,key)=>(
                                                    <tr key={key}>
                                                        <td>{key+1}.</td>
                                                        <td>{val?.workshopTitle}</td>
                                                        <td>{val?.workshopShortDescription}</td>
                                                        <td className='d-flex align-items-center gap-3'>
                                                            <Link href={`/admin/workshopImages/${val?._id}`} type='button' className='btn btn-sm btn-custom' title='Show Images'><i className="fa-solid fa-images"></i></Link>
                                                            <button type='button' className='btn btn-sm btn-custom' title='Add Image' onClick={() => handleImageModal(val?._id)}><i className="fa-regular fa-image"></i></button>
                                                            <button type='button' className='btn btn-sm btn-custom' title='Edit' onClick={() => handleEdit(val?._id)}><i className="fa-solid fa-pen-to-square"></i></button>
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

            {/* add workshop modal */}
            <div
                className={`modal fade${showAddStudentModal ? ' show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showAddStudentModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Workshop</h1>
                            <button type="button" className="btn-close" onClick={() => setShowAddStudentModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <input 
                                type="text"
                                name='workshopTitle'
                                className='form-control form-control-sm mb-3'
                                placeholder='Title'
                                value={postData?.workshopTitle}
                                onChange={handleInput} 
                            />
                            <textarea
                                name='workshopShortDescription'
                                className='form-control form-control-sm mb-3'
                                placeholder='Short Description'
                                rows={5}
                                value={postData?.workshopShortDescription}
                                onChange={handleInput} 
                            ></textarea>
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

            {/* add event image modal */}
            <div
                className={`modal fade${showAddImageModal ? ' show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showAddImageModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Workshop Images</h1>
                            <button type="button" className="btn-close" onClick={() => setShowAddImageModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <input 
                                type="file"
                                className='form-control form-control-sm'
                                onChange={(e) => setWorkshopImages(e.target.files[0])}
                            />
                        </div>
                        <div className="modal-footer">
                            {
                                isLoading ?
                                <LoaderMini />
                                :
                                <button type="button" className="btn btn-custom btn-sm" onClick={handleWorkshopImagesSubmit}>Save</button>
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
            
            {/* Add Image Success Modal */}
            <div
                className={`modal fade${showAddImageMessageModal ? ' show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showAddImageMessageModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <div className="modal-title" id="successModalLabel">
                                <div className={`${workshopImagesStatus == 'success' ? 'success' : 'failed'}-icon`}>
                                    {
                                        workshopImagesStatus == 'success' ?
                                        <i className="fa-solid fa-thumbs-up"></i>
                                        :
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="fs-4 text-center">{workshopImagesMessage}</div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                className={`btn btn-${workshopImagesStatus == 'success' ? 'success' : 'danger'} btn-sm`}
                                onClick={closeAddImageModal}
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

export default WorkshopList