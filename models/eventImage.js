import mongoose, { Schema } from "mongoose";


const eventImageSchema = new Schema(
    {
        eventId: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
        eventImage: {
            url: String,
            public_id: String
        },
    },
    {
        timestamps: true,
    }
);

const EventImage = mongoose.models.EventImage || mongoose.model("EventImage", eventImageSchema)

export default EventImage;