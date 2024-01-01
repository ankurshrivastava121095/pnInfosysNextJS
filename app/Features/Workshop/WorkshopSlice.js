import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

const initialState = {
  workshops: [],
  responseStatus: "",
  responseMessage: "",
};

export const createWorkshop = createAsyncThunk(
  "workshops/createWorkshop",
  async (workshop, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/workshop`, workshop);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getWorkshops = createAsyncThunk("workshops/getWorkshops", async () => {
  try {
    const response = await axios.get(`${baseURL}/workshop`);
    return response.data.workshops;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getWorkshop = createAsyncThunk(
  "workshops/getWorkshop",
  async (workshopId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/workshop/${workshopId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateWorkshop = createAsyncThunk(
  "workshops/updateWorkshop",
  async (workshop, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseURL}/workshop/${workshop._id}`, workshop);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteWorkshop = createAsyncThunk(
  "workshops/deleteWorkshop",
  async (workshopId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/workshop/${workshopId}`);
      return workshopId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const workshopsSlice = createSlice({
  name: "workshops",
  initialState,
  reducers: {
    resetWorkshopState: (state) => initialState,
  },
  extraReducers: (builder) => {
    // store starts
    builder
      .addCase(createWorkshop.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createWorkshop.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Workshop created successfully";
      })
      .addCase(createWorkshop.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // fetching all starts
    builder
      .addCase(getWorkshops.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getWorkshops.fulfilled, (state, action) => {
        state.workshops = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getWorkshops.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // fetching single starts
    builder
      .addCase(getWorkshop.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getWorkshop.fulfilled, (state, action) => {
        state.workshops = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getWorkshop.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // deleting starts
    builder
      .addCase(deleteWorkshop.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deleteWorkshop.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Workshop deleted successfully";
      })
      .addCase(deleteWorkshop.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // updating starts
    builder
      .addCase(updateWorkshop.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updateWorkshop.fulfilled, (state, action) => {
        if (Array.isArray(state.workshops)) {
          state.workshops = state.workshops.map((workshop) =>
            workshop.id === action.payload._id ? action.payload : workshop
          );
        } else {
          state.workshops = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Workshop updated successfully";
      })
      .addCase(updateWorkshop.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetWorkshopState } = workshopsSlice.actions;
export default workshopsSlice.reducer;