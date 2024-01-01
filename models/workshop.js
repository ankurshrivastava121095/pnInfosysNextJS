import mongoose, { Schema } from "mongoose";


const workshopSchema = new Schema(
    {
        workshopTitle: String,
        workshopShortDescription: String,
    },
    {
        timestamps: true,
    }
);

const Workshop = mongoose.models.Workshop || mongoose.model("Workshop", workshopSchema)

export default Workshop;