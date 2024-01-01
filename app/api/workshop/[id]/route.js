import connectMongoDB from "@/libs/mongodb"
import Workshop from "@/models/workshop";
import { NextResponse } from "next/server";

export async function PUT(req,  {params}){
    try {
        const { id } = params;
        const { newtitle: workshopTitle, newDescription: workshopShortDescription } = await req.json();
        await connectMongoDB();
        await Workshop.findByIdAndUpdate(id, { workshopTitle, workshopShortDescription })
        return NextResponse.json({ message: 'Workshop Updated Successfully !' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}

export async function GET(req,  {params}){
    try {
        const { id } = params;
        await connectMongoDB();
        const workshop = await Workshop.findOne({ _id: id })
        return NextResponse.json({ workshop }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}