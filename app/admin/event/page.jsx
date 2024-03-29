'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import OneStepBreadcrumbs from '../AdminComponents/BreadCrumbs/OneStepBreadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import LoaderLarge from '@/app/components/Loader/LoaderLarge'
import { createEvent, deleteEvent, getEvent, getEvents, resetEventState, updateEvent } from '@/app/Features/Event/EventSlice'
import LoaderMini from '@/app/components/Loader/LoaderMini'
import { createEventImage, resetEventImageState } from '@/app/Features/EventImage/EventImageSlice'
import Link from 'next/link'

const EventList = () => {

    const dispatch = useDispatch()

    const fields = {
        eventTitle: '',
        eventShortDescription: '',
    }

    const [postData, setPostData] = useState(fields)
    const [eventImages, setEventImages] = useState()
    const [isUpdating, setIsUpdating] = useState(false)
    const [eventId, setEventId] = useState('')
    const [isLoading, setIsLoading] = useState(true)    
    const [data, setData] = useState([]);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false)
    const [showMessageModal, setshowMessageModal] = useState(false)
    const [showAddImageMessageModal, setshowAddImageMessageModal] = useState(false)
    const [showAddImageModal, setShowAddImageModal] = useState(false)

    const { events, responseStatus, responseMessage } = useSelector((state) => state.events)
    const { eventImages: eventImagesFromStore, responseStatus: eventImagesStatus, responseMessage: eventImagesMessage } = useSelector((state) => state.eventImages)

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    const fetchEvents = () => {
        setIsLoading(true)
        dispatch(getEvents())
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = useMemo(() => {
        const filteredSlice = data.filter((item) => (
            item.eventTitle?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item.eventShortDescription?.toLowerCase()?.includes(searchTerm.toLowerCase())
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
            dispatch(createEvent(postData))
        } else {
            const eventData = {
                _id: eventId,
                newtitle: postData.eventTitle,
                newDescription: postData.eventShortDescription
            }
            dispatch(updateEvent(eventData))
        }
    }

    const handleImageModal = (id) => {
        setEventId(id)
        setShowAddImageModal(true)
    }

    const handleEventImagesSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        const formdata = new FormData()
        formdata.set('eventId', eventId)
        formdata.set('eventImage', eventImages)

        dispatch(createEventImage(formdata));
    }

    const handleEdit = (id) => {
        setIsLoading(true)
        dispatch(getEvent(id))
    }

    const closeModal = () => {
        dispatch(resetEventState());
        setshowMessageModal(false);
        setEventId('')
        setIsUpdating(false)
        fetchEvents()
    };

    const closeAddImageModal = () => {
        dispatch(resetEventImageState());
        setshowAddImageMessageModal(false);
        setEventId('')
    };

    useEffect(()=>{
        fetchEvents()
    },[])

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == 'Event created successfully')) {
            setIsLoading(false)
            setShowAddStudentModal(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == 'Event updated successfully')) {
            setIsLoading(false)
            setShowAddStudentModal(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            if (Array?.isArray(events)) {
                setData(events)
            } else {
                setPostData(events?.event)
                setEventId(events?.event?._id)
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
        if ((eventImagesStatus == 'success' && eventImagesMessage == 'Event Image created successfully')) {
            setIsLoading(false)
            setShowAddImageModal(false)
            setshowAddImageMessageModal(true)
        }
        if ((eventImagesStatus == 'rejected')) {
            setIsLoading(false)
            setshowAddImageMessageModal(true)
        }
    },[eventImagesStatus,eventImagesMessage])

    return (
        <>
            <OneStepBreadcrumbs 
                currentPageName='Event Management'
            />
            <div className='bodySection'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='fs-5'>Event List</div>
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
                                                        <td>{val?.eventTitle}</td>
                                                        <td>{val?.eventShortDescription}</td>
                                                        <td className='d-flex align-items-center gap-3'>
                                                            <Link href={`/admin/eventImages/${val?._id}`} type='button' className='btn btn-sm btn-custom' title='Show Images'><i className="fa-solid fa-images"></i></Link>
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

            {/* add event modal */} 
            <div
                className={`modal fade${showAddStudentModal ? ' show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showAddStudentModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Event</h1>
                            <button type="button" className="btn-close" onClick={() => setShowAddStudentModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <input 
                                type="text"
                                name='eventTitle'
                                className='form-control form-control-sm mb-3'
                                placeholder='Title'
                                value={postData?.eventTitle}
                                onChange={handleInput} 
                            />
                            <textarea
                                name='eventShortDescription'
                                className='form-control form-control-sm mb-3'
                                placeholder='Short Description'
                                rows={5}
                                value={postData?.eventShortDescription}
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Event Images</h1>
                            <button type="button" className="btn-close" onClick={() => setShowAddImageModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <input 
                                type="file"
                                className='form-control form-control-sm'
                                onChange={(e) => setEventImages(e.target.files[0])}
                            />
                        </div>
                        <div className="modal-footer">
                            {
                                isLoading ?
                                <LoaderMini />
                                :
                                <button type="button" className="btn btn-custom btn-sm" onClick={handleEventImagesSubmit}>Save</button>
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
                                <div className={`${eventImagesStatus == 'success' ? 'success' : 'failed'}-icon`}>
                                    {
                                        eventImagesStatus == 'success' ?
                                        <i className="fa-solid fa-thumbs-up"></i>
                                        :
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="fs-4 text-center">{eventImagesMessage}</div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                className={`btn btn-${eventImagesStatus == 'success' ? 'success' : 'danger'} btn-sm`}
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

export default EventList