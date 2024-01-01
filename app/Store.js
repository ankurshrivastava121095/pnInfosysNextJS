import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import contactReducer from "./Features/Contact/ContactSlice";
import placementReducer from "./Features/Placement/PlacementSlice";
import workshopReducer from "./Features/Workshop/WorkshopSlice";
import workshopImageReducer from "./Features/WorkshopImage/WorkshopImageSlice";
import eventReducer from "./Features/Event/EventSlice";
import eventImageReducer from "./Features/EventImage/EventImageSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactReducer,
        placements: placementReducer,
        workshops: workshopReducer,
        events: eventReducer,
        workshopImages: workshopImageReducer,
        eventImages: eventImageReducer,
    },
});