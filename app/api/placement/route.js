import { writeFile } from 'fs/promises'
import connectMongoDB from "@/libs/mongodb"
import Placement from "@/models/placement";
import { NextResponse } from "next/server";
const fs = require('fs').promises;
const path = require('path');
import { join } from 'path'

export async function POST(req) {
    const data = await req.formData()
    const formDataArray = Array.from(data.entries()).map(([name, value]) => ({ name, value }));
    const extractedData = {};
    formDataArray.forEach(({ name, value }) => {
        extractedData[name] = value;
      });
    const file = data.get('studentImage')
    await connectMongoDB();

    if (!file) {
        return NextResponse.json({ message: 'File is missing !' }, { status: 401 })
    } else {
        const uploadFolder = path.join(process.cwd(), 'public/upload');

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        const currentDate = new Date();
        const timestamp = currentDate.getTime();

        const originalFileName = file.name;
        const fileExtension = path.extname(originalFileName);

        const newFileName = `${timestamp}${fileExtension}`;
        const filePath = join(uploadFolder, newFileName);

        await fs.writeFile(filePath, buffer);

        try {
            const { studentName, companyName, designation } = extractedData;
            const dataSaved = await Placement.create({ 
                studentName: studentName, 
                companyName: companyName, 
                designation: designation, 
                studentImage: newFileName 
            });
            if (dataSaved) {
                return NextResponse.json({ message: 'Student created Successfully !' }, { status: 201 })
            } else {
                return NextResponse.json({ message: 'Image saved but Student not Save !' }, { status: 401 })
            }
        } catch (error) {
            return NextResponse.json({ message: error }, { status: 401 })
        } 
    }
}

export async function GET() {
    await connectMongoDB();
    const placements = await Placement.find().sort({ _id: -1 })
    return NextResponse.json({ placements }, { status: 200 })
}