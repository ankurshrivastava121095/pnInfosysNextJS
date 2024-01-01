import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

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
  "contacts/getContact",
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/contact/${contactId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (contact, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", contact.name);
      formData.append("description", contact.description);
      formData.append("image", contact.image);

      const response = await axios.put(`${baseURL}/contact/${contact._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
  extraReducers: (builder) => {
    // store starts
    builder
      .addCase(createContact.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(createContact.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Message Sent Successfully";
      })
      .addCase(createContact.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // fetching all starts
    builder
      .addCase(getContacts.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // fetching single starts
    builder
      .addCase(getContact.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.responseStatus = "success";
      })
      .addCase(getContact.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // deleting starts
    builder
      .addCase(deleteContact.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.responseStatus = "success";
        state.responseMessage = "Contact deleted successfully";
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });

    // updating starts
    builder
      .addCase(updateContact.pending, (state) => {
        state.responseStatus = "pending";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        if (Array.isArray(state.contacts)) {
          state.contacts = state.contacts.map((contact) =>
            contact.id === action.payload._id ? action.payload : contact
          );
        } else {
          state.contacts = action.payload;
        }
        state.responseStatus = "success";
        state.responseMessage = "Contact updated successfully";
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.responseStatus = "rejected";
        state.responseMessage = action.payload;
      });
  },
});

export const { resetContactState } = contactsSlice.actions;
export default contactsSlice.reducer;