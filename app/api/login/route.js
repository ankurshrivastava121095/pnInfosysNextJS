import connectMongoDB from "@/libs/mongodb"
import User from "@/models/user";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
import Cookies from 'js-cookie';

export async function POST(req) {
    const { email, password } = await req.json()
    await connectMongoDB();
    
    if (email && password) {
        const user = await User.findOne({ email: email })

        if (user != null) {
            const isPasswordMatched = await bcrypt.compare(password, user.password)

            if ((user.email === email) && isPasswordMatched) {
                const token = jwt.sign({ userId: user._id }, 'pnInfosysNextJS')

                return NextResponse.json({ message: 'User Found !', status: 201, token, user }, { status: 201 })
            } else {
                return NextResponse.json({ message: 'User not Found !', status: 404 }, { status: 404 })
            }
        } else {
            return NextResponse.json({ message: 'User not Found !', status: 404 }, { status: 404 })
        }
    } else {
        return NextResponse.json({ message: 'All Fields are Required !', status: 401 }, { status: 401 })
    }
}