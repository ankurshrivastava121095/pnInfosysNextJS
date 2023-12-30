import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req,  {params}){
    try {
        const { id } = params;
        const { newFirstName: firstName, newLastName: lastName, newEmail: email, newUserName: userName, newPhone: phone, newAlternatePhone: alternatePhone, newPincode: pincode, newCity: city, newState: state,newCountry: country } = await req.json();
        await connectMongoDB();
        await User.findByIdAndUpdate(id, { firstName, lastName, email, userName, password, phone, alternatePhone, pincode, city, state, country })
        return NextResponse.json({ message: 'User Updated Successfully !' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}

export async function GET(req,  {params}){
    try {
        const { id } = params;
        await connectMongoDB();
        const user = await User.findOne({ _id: id })
        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}