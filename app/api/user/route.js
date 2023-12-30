import connectMongoDB from "@/libs/mongodb"
import User from "@/models/user";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export async function POST(req) {
    const { firstName, lastName, email, userName, password, phone } = await req.json()
    await connectMongoDB();
    const userExist = await User.findOne({
        $or: [
            { email: email },
            { userName: userName }
            ]
        });
    if (userExist) {
        return NextResponse.json({ message: 'User Already Exist with with this either Email or Username !' }, { status: 403 })
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        await User.create({ firstName, lastName, email, userName, password: hashPassword, phone });
        return NextResponse.json({ message: 'User Created Successfully !' }, { status: 201 })
    }
}

export async function GET() {
    await connectMongoDB();
    const users = await User.find()
    return NextResponse.json({ users }, { status: 200 })
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await User.findByIdAndDelete(id)
    return NextResponse.json({ message: 'User Deleted Successfully !' }, { status: 200 })
}