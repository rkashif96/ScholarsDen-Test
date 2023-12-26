import dbConnect from "@/app/lib/dbConnect"
import { NextResponse } from "next/server"
import UserModel from "@/app/models/user.model"
import bcrypt from 'bcrypt'
const Response = (obj: any, status: any) => {
  return NextResponse.json({ obj, status })
}

export const POST = async (request: Request) => {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();
    const user = await UserModel.find({ email });
    const userExist = user.length > 0
    if (!userExist) {
      const obj = await UserModel.create({
        name,
        email,
        password
      })
      return Response(obj, 200)
    }

    return Response({
      message: 'User Already Exists'
    }, 400)
  } catch (error) {
    let obj = {
      err: error,
      message: 'Invalid Request'
    }
    return Response(obj, 400)

  }

}

