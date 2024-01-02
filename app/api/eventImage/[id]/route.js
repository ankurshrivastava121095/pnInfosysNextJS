import connectMongoDB from "@/libs/mongodb";
import Event from "@/models/event";
import EventImage from "@/models/eventImage";
import { NextResponse } from "next/server";

export async function GET(req,  {params}) {
    const { id } = params;
    await connectMongoDB();
    const event = await Event.findOne({ _id: id })
    const eventImages = await EventImage.find({ eventId: id }).sort({ _id: -1 })
    return NextResponse.json({ event, eventImages }, { status: 200 })
}

export async function DELETE(req,  {params}) {
    try {
        const { id } = params;
        await connectMongoDB();
        await EventImage.findByIdAndDelete(id)
        return NextResponse.json({ message: 'Event Image Deleted Successfully !' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `Error: ${error}` }, { status: 401 })
    }
}