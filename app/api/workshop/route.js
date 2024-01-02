import connectMongoDB from "@/libs/mongodb"
import Workshop from "@/models/workshop";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { workshopTitle, workshopShortDescription } = await req.json()
    await connectMongoDB();
    await Workshop.create({ workshopTitle, workshopShortDescription });
    return NextResponse.json({ message: 'Workshop created Successfully !' }, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const workshops = await Workshop.find().sort({ _id: -1 })
    return NextResponse.json({ workshops }, { status: 200 })
}