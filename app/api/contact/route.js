import connectMongoDB from "@/libs/mongodb"
import Contact from "@/models/contact";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { name, email, phone, message } = await req.json()
    await connectMongoDB();
    await Contact.create({ name, email, phone, message });
    return NextResponse.json({ message: 'Message Sent Successfully !' }, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const contacts = await Contact.find().sort({ _id: -1 })
    return NextResponse.json({ contacts }, { status: 200 })
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Contact.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Contact Deleted Successfully !' }, { status: 200 })
}