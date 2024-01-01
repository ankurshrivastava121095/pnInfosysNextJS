import connectMongoDB from "@/libs/mongodb"
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function PUT(req,  {params}){
    try {
        const { id } = params;
        const { newtitle: eventTitle, newDescription: eventShortDescription } = await req.json();
        await connectMongoDB();
        await Event.findByIdAndUpdate(id, { eventTitle, eventShortDescription })
        return NextResponse.json({ message: 'Event Updated Successfully !' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}

export async function GET(req,  {params}){
    try {
        const { id } = params;
        await connectMongoDB();
        const event = await Event.findOne({ _id: id })
        return NextResponse.json({ event }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}