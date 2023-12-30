import connectMongoDB from "@/libs/mongodb";
import Contact from "@/models/contact";
import { NextResponse } from "next/server";

export async function PUT(req,  {params}){
    try {
        const { id } = params;
        const { newName: name, newEmail: email, newPhone: phone, newMessage: message } = await req.json();
        await connectMongoDB();
        await Contact.findByIdAndUpdate(id, { name, email, phone, message })
        return NextResponse.json({ message: 'Contact Updated Successfully !' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}

export async function GET(req,  {params}){
    try {
        const { id } = params;
        await connectMongoDB();
        const contact = await Contact.findOne({ _id: id })
        return NextResponse.json({ contact }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}