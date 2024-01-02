import connectMongoDB from "@/libs/mongodb"
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { eventTitle, eventShortDescription } = await req.json()
    await connectMongoDB();
    await Event.create({ eventTitle, eventShortDescription });
    return NextResponse.json({ message: 'Event created Successfully !' }, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const events = await Event.find().sort({ _id: -1 })
    return NextResponse.json({ events }, { status: 200 })
}