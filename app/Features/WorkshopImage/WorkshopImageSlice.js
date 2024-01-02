/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT

const initialState = {
    workshopImages: [],
    responseStatus: "",
    responseMessage: "",
};

export const createWorkshopImage = createAsyncThunk(
    "workshopImages/createWorkshopImage",
    async (workshopImage, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/workshopImage`, workshopImage);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getWorkshopImages = createAsyncThunk(
    "workshopImages/getWorkshopImages",
    async (workshopImageId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/workshopImage/${workshopImageId}`);
            return response?.data?.workshopImages;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getWorkshopImage = createAsyncThunk(
    "workshopImages/getWorkshopImage",
    async (workshopImageId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${baseURL}/workshopImage/${workshopImageId}`
            );
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const updateWorkshopImage = createAsyncThunk(
    "workshopImages/updateWorkshopImage",
    async (workshopImage, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("workshopId", workshopImage.get('workshopId'));
            formData.append("workshopImage", workshopImage.get('workshopImage'));

            const response = await axios.put(
                `${baseURL}/workshopImage/${workshopImage.get('_id')}`,
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

export const deleteWorkshopImage = createAsyncThunk(
    "workshopImages/deleteWorkshopImage",
    async (workshopImageId, { rejectWithValue }) => {
        try {
            await axios.delete(`${baseURL}/workshopImage/${workshopImageId}`);
            return workshopImageId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const workshopImagesSlice = createSlice({
    name: "workshopImages",
    initialState,
    reducers: {
        resetWorkshopImageState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createWorkshopImage.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createWorkshopImage.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Workshop Image created successfully";
        })
        .addCase(createWorkshopImage.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get all reducers
        builder
        .addCase(getWorkshopImages.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getWorkshopImages.fulfilled, (state, action) => {
            state.workshopImages = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getWorkshopImages.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getWorkshopImage.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getWorkshopImage.fulfilled, (state, action) => {
            state.workshopImages = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getWorkshopImage.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateWorkshopImage.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateWorkshopImage.fulfilled, (state, action) => {
            if (Array.isArray(state.workshopImages)) {
            state.workshopImages = state.workshopImages.map((workshopImage) =>
                workshopImage.id === action.payload._id ? action.payload : workshopImage
            );
            } else {
            state.workshopImages = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Workshop Image updated successfully";
        })
        .addCase(updateWorkshopImage.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
        
        // deleting starts
        builder
        .addCase(deleteWorkshopImage.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deleteWorkshopImage.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Workshop Image deleted successfully";
        })
        .addCase(deleteWorkshopImage.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetWorkshopImageState } = workshopImagesSlice.actions;
export default workshopImagesSlice.reducer;
