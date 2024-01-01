import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

const initialState = {
  events: [],
  responseStatus: "",
  responseMessage: "",
};

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (event, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/event`, event);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getEvents = createAsyncThunk("events/getEvents", async () => {
  try {
    const response = await axios.get(`${baseURL}/event`);
    return response.data.events;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getEvent = createAsyncThunk(
  "events/getEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/event/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (event, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseURL}/event/${event._id}`, event);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/event/${eventId}`);
      return eventId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    resetEventState: (state) => initialState,
  },
  extraReducers: (builder) => {
    // store starts
    builder
      .addCase(createEvent.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Event created successfully";
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // fetching all starts
    builder
      .addCase(getEvents.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // fetching single starts
    builder
      .addCase(getEvent.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.events = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // deleting starts
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Event deleted successfully";
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // updating starts
    builder
      .addCase(updateEvent.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        if (Array.isArray(state.events)) {
          state.events = state.events.map((event) =>
            event.id === action.payload._id ? action.payload : event
          );
        } else {
          state.events = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Event updated successfully";
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetEventState } = eventsSlice.actions;
export default eventsSlice.reducer;