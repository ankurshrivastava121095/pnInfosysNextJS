/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT

const initialState = {
    eventImages: [],
    responseStatus: "",
    responseMessage: "",
};

export const createEventImage = createAsyncThunk(
    "eventImages/createEventImage",
    async (eventImage, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/eventImage`, eventImage);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getEventImages = createAsyncThunk(
    "eventImages/getEventImages",
    async () => {
        try {
            const response = await axios.get(`${baseURL}/eventImage`);
            return response?.data?.eventImages;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getEventImage = createAsyncThunk(
    "eventImages/getEventImage",
    async (eventImageId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseURL}/eventImage/${eventImageId}`
            );
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const updateEventImage = createAsyncThunk(
    "eventImages/updateEventImage",
    async (eventImage, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("eventId", eventImage.get('eventId'));
            formData.append("eventImage", eventImage.get('eventImage'));

            const response = await axios.put(
                `${baseURL}/eventImage/${eventImage.get('_id')}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteEventImage = createAsyncThunk(
    "eventImages/deleteEventImage",
    async (eventImageId, { rejectWithValue }) => {
        try {
            await axios.delete(`${baseURL}/eventImage/${eventImageId}`);
            return eventImageId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const eventImagesSlice = createSlice({
    name: "eventImages",
    initialState,
    reducers: {
        resetEventImageState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createEventImage.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createEventImage.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Event Image created successfully";
        })
        .addCase(createEventImage.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get all reducers
        builder
        .addCase(getEventImages.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getEventImages.fulfilled, (state, action) => {
            state.eventImages = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getEventImages.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getEventImage.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getEventImage.fulfilled, (state, action) => {
            state.eventImages = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getEventImage.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateEventImage.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateEventImage.fulfilled, (state, action) => {
            if (Array.isArray(state.eventImages)) {
            state.eventImages = state.eventImages.map((eventImage) =>
                eventImage.id === action.payload._id ? action.payload : eventImage
            );
            } else {
            state.eventImages = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Event Image updated successfully";
        })
        .addCase(updateEventImage.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
        
        // deleting starts
        builder
        .addCase(deleteEventImage.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deleteEventImage.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Event Image deleted successfully";
        })
        .addCase(deleteEventImage.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetEventImageState } = eventImagesSlice.actions;
export default eventImagesSlice.reducer;
