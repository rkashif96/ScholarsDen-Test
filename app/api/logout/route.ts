import { NextResponse } from "next/server"
import { cookies } from "next/headers"
const Response = (obj: any, status: any) => {
  return NextResponse.json({ obj, status })
}

export const GET = async (request: Request) => {
  try {
    let obj = cookies().delete('token')
    return Response(obj, 200)
  } catch (error) {
    let obj = {
      err: error,
      message: 'Invalid Request'
    }
    return Response(obj, 400)

  }

}

