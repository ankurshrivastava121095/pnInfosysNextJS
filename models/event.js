import mongoose, { Schema } from "mongoose";


const eventSchema = new Schema(
    {
        eventTitle: String,
        eventShortDescription: String,
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema)

export default Event;