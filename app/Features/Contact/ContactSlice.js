import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT

const initialState = {
    contacts: [],
    responseStatus: "",
    responseMessage: "",
};

export const createContact = createAsyncThunk(
    "contacts/createContact",
    async (contact, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/contact`, contact);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getContacts = createAsyncThunk("contacts/getContacts", async () => {
    try {
        const response = await axios.get(`${baseURL}/contact`);
        return response.data.contacts;
    } catch (error) {
        return error.response.data.message;
    }
});

export const getContact = createAsyncThunk(
    "contacts/getContact", async (contactId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/contact/${contactId}`);
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    });

export const updateContact = createAsyncThunk(
    "contacts/updateContact",
    async (contact, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', contact.name);
            formData.append('description', contact.description);
            formData.append('image', contact.image);

            const response = await axios.put(`${baseURL}/contact/${contact._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, { rejectWithValue }) => {
        try {
            await axios.delete(`${baseURL}/contact/${contactId}`);
            return contactId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        resetContactState: (state) => initialState,
    },
    extraReducers: {
        // store starts
        [createContact.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [createContact.fulfilled]: (state, action) => {
            return {
                ...state,
                // categories: [...state.categories, action.payload],
                responseStatus: "success",
                responseMessage: "Message Sent Successfully",
            };
        },
        [createContact.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        // store ends

        // fetching all starts
        [getContacts.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getContacts.fulfilled]: (state, action) => {
            return {
                ...state,
                contacts: action.payload,
                responseStatus: "success",
            };
        },
        [getContacts.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        // fetching all ends

        // fetching single starts
        [getContact.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getContact.fulfilled]: (state, action) => {
            return {
                ...state,
                contacts: action.payload,
                responseStatus: "success",
            };
        },
        [getContact.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        // fetching single ends

        // deleting starts
        [deleteContact.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteContact.fulfilled]: (state, action) => {
            return {
                ...state,
                // categories: state.categories.filter((category) => category._id !== action.payload),
                responseStatus: "success",
                responseMessage: "Contact deleted successfully",
            };
        },
        [deleteContact.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        // deleting ends

        // updating starts
        [updateContact.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateContact.fulfilled]: (state, action) => {
            if (Array.isArray(state.contacts)) {
                return {
                    ...state,
                    contacts: state.contacts.map((contact) =>
                        contact.id === action.payload._id ? action.payload : contact
                    ),
                    responseStatus: "success",
                    responseMessage: "Contact updated successfully",
                };
            } else {
                return {
                    ...state,
                    contacts: action.payload,
                    responseStatus: "success",
                    responseMessage: "Contact updated successfully",
                };
            }
        },
        [updateContact.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        // updating ends
    },
});

export const { resetContactState } = contactsSlice.actions;
export default contactsSlice.reducer;
