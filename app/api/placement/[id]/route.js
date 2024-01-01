import connectMongoDB from "@/libs/mongodb";
import Placement from "@/models/placement";
import { NextResponse } from "next/server";
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

export async function PUT(req,  {params}){
    try {
        const { id } = params;
        const { newName: studentName, newCompany: companyName, newDesignation: designation } = await req.json();
        await connectMongoDB();

        if (req.files != null) {
            await Placement.findByIdAndUpdate(id, { 
                studentName, 
                companyName, 
                designation, 
                studentImage: {
                    public_id: cloud.public_id,
                    url: cloud.secure_url
                },
            })
        } else {
            await Placement.findByIdAndUpdate(id, { 
                studentName, 
                companyName, 
                designation,
            })
        }
        return NextResponse.json({ message: 'Student Updated Successfully !' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}

export async function GET(req,  {params}){
    try {
        const { id } = params;
        await connectMongoDB();
        const placement = await Placement.findOne({ _id: id })
        return NextResponse.json({ placement }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}

export async function DELETE(req,  {params}) {
    try {
        const { id } = params;
        await connectMongoDB();
        await Placement.findByIdAndDelete(id)
        return NextResponse.json({ message: 'Student Deleted Successfully !' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `Error: ${error}` }, { status: 401 })
    }
}