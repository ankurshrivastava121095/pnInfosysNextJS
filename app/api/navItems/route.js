import connectMongoDB from "@/libs/mongodb"
import Workshop from "@/models/workshop";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const workshops = await Workshop.find()
    const events = await Event.find()

    const navItem = {workshops, events}
    return NextResponse.json({ navItem }, { status: 200 })
}