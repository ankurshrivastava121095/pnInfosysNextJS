import connectMongoDB from "@/libs/mongodb";
import Workshop from "@/models/workshop";
import WorkshopImage from "@/models/workshopImage";
import { NextResponse } from "next/server";

export async function GET(req,  {params}) {
    const { id } = params;
    await connectMongoDB();
    const workshop = await Workshop.findOne({ _id: id })
    const workshopImages = await WorkshopImage.find({ workshopId: id }).sort({ _id: -1 })
    return NextResponse.json({ workshop, workshopImages }, { status: 200 })
}

export async function DELETE(req,  {params}) {
    try {
        const { id } = params;
        await connectMongoDB();
        await WorkshopImage.findByIdAndDelete(id)
        return NextResponse.json({ message: 'Workshop Image Deleted Successfully !' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `Error: ${error}` }, { status: 401 })
    }
}