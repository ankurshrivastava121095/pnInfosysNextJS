'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import OneStepBreadcrumbs from '../AdminComponents/BreadCrumbs/OneStepBreadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import LoaderLarge from '@/app/components/Loader/LoaderLarge'
import { deleteContact, getContacts, resetContactState } from '@/app/Features/Contact/ContactSlice'

const ContactList = () => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)    
    const [data, setData] = useState([]);
    const [showMessageModal, setshowMessageModal] = useState(false)

    const { contacts, responseStatus, responseMessage } = useSelector((state) => state.contacts)

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    const fetchContacts = () => {
        setIsLoading(true)
        dispatch(getContacts())
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = useMemo(() => {
        const filteredSlice = data.filter((item) => (
            item.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item.phone?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item.message?.toLowerCase()?.includes(searchTerm.toLowerCase())
        ));
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        return filteredSlice.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage, searchTerm]);

    const handleDelete = (id) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this contact?');

        if (shouldDelete) {
            setIsLoading(true);
            dispatch(deleteContact(id));
        }
    }

    const closeModal = () => {
        dispatch(resetContactState());
        setshowMessageModal(false);
        fetchContacts()
    };

    useEffect(()=>{
        fetchContacts()
    },[])

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == 'Contact deleted successfully')) {
            setIsLoading(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            setData(contacts)
        }
        if ((responseStatus == 'rejected')) {
            setIsLoading(false)
            setshowMessageModal(true)
        }
    },[responseStatus,responseMessage])

    return (
        <>
            <OneStepBreadcrumbs 
                currentPageName='Contact Management'
            />
            <div className='bodySection'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='fs-5'>Contact Message List</div>
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
                                                <th>NAME</th>
                                                <th>EMAIL</th>
                                                <th>PHONE</th>
                                                <th>MESSAGE</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Array?.isArray(filteredData) && filteredData?.map((val,key)=>(
                                                    <tr key={key}>
                                                        <td>{key+1}.</td>
                                                        <td>{val?.name}</td>
                                                        <td>{val?.email}</td>
                                                        <td>{val?.phone}</td>
                                                        <td>{val?.message}</td>
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

export default ContactList