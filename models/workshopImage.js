import mongoose, { Schema } from "mongoose";


const workshopImageSchema = new Schema(
    {
        workshopId: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Workshop',
        },
        workshopImage: String,
    },
    {
        timestamps: true,
    }
);

const WorkshopImage = mongoose.models.WorkshopImage || mongoose.model("WorkshopImage", workshopImageSchema)

export default WorkshopImage;