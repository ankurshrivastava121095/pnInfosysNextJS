import mongoose, { Schema } from "mongoose";


const placementSchema = new Schema(
    {
        studentName: String,
        companyName: String,
        designation: String,
        studentImage: String,
    },
    {
        timestamps: true,
    }
);

const Placement = mongoose.models.Placement || mongoose.model("Placement", placementSchema)

export default Placement;