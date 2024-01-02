'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoaderLarge from '@/app/components/Loader/LoaderLarge'
import { deleteEventImage, getEventImages, resetEventImageState } from '@/app/Features/EventImage/EventImageSlice'
import TwoStepBreadcrumbs from '../../AdminComponents/BreadCrumbs/TwoStepBreadcrumbs'

const EventImagesList = (event) => {

    const eventID = event?.params?.id

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)    
    const [data, setData] = useState([]);
    const [showMessageModal, setshowMessageModal] = useState(false)

    const { eventImages, responseStatus, responseMessage } = useSelector((state) => state.eventImages)

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    const fetchEventImages = () => {
        setIsLoading(true)
        dispatch(getEventImages(eventID))
    }

    const filteredData = useMemo(() => {
        const filteredSlice = data.filter((item) => (
            item.eventId?.toLowerCase()?.includes(searchTerm.toLowerCase())
        ));
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        return filteredSlice.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage, searchTerm]);

    const handleDelete = (id) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this image?');

        if (shouldDelete) {
            setIsLoading(true);
            dispatch(deleteEventImage(id));
        }
    };

    const closeModal = () => {
        dispatch(resetEventImageState());
        setshowMessageModal(false);
        fetchEventImages()
    };

    useEffect(()=>{
        fetchEventImages()
    },[])

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == 'Event Image deleted successfully')) {
            setIsLoading(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            setData(eventImages)
        }
        if ((responseStatus == 'rejected')) {
            setIsLoading(false)
            setshowMessageModal(true)
        }
    },[responseStatus,responseMessage])

    return (
        <>
            <TwoStepBreadcrumbs 
                currentPageName='Event Images'
                previousPageName='Event Managment'
                previousPageLink='/admin/Event'
            />
            <div className='bodySection'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='fs-5'>Event Images</div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            isLoading ?
                            <LoaderLarge />
                            :
                            <>
                                {
                                    Array?.isArray(filteredData) && filteredData?.map((val,key)=>(
                                        <div key={key} className="container mb-4">
                                            <div className="row">
                                                <div className="col-md-3 mt-4">
                                                    <div className='card-body-custom'>
                                                        <i role='button' class="fa-solid fa-circle-xmark text-danger float-end mb-2" title='Delete' onClick={() => handleDelete(val?._id)}></i>
                                                        <center>
                                                            <img src={`/upload/${val?.eventImage}`} className='rounded max-width-100 max-height-250px' alt="" />
                                                        </center>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

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

export default EventImagesList