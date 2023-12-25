import dbConnect from "@/app/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server"
import UserModel from "@/app/models/user.model"
import { cookies } from "next/headers"
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from "jsonwebtoken"

const Response = (obj: any, status: any) => {
  return NextResponse.json({ obj, status })
}
interface SignOption {
  expiresIn?: string | number;
}

export const POST = async (request: NextRequest) => {
  try {
    await dbConnect()
    const { email, password } = await request.json();
    const user = await UserModel.find({ email });
    let comp = (await bcrypt.compare(password, user[0].password))

    if (!user[0] || !comp) {
      throw new Error('Invalid credentials');
    }
    let payload: JwtPayload = { userId: user[0]._id }
    let option: SignOption = {
      expiresIn: '1d'
    }
    const authToken = jwt.sign(payload, 'mySecretKey', option)
    cookies().set('token', authToken)
    let obj = {
      token: String(authToken)
    }
    return Response(obj, 200)
  } catch (error) {
    let obj = {
      err: error,
      message: 'Invalid Request'
    }
    return Response(obj, 400)
  }

}

