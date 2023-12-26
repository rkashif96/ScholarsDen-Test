import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
const Response = (obj: any, status: any) => {
  return NextResponse.json({ obj, status })
}

export const GET = async (request: NextRequest) => {
  try {
    cookies().delete('token')
    return Response({ message: 'Logged Out Success' }, 200)
  } catch (error) {
    let obj = {
      err: error,
      message: 'Invalid Request'
    }
    cookies().delete('token')

    return Response(obj, 400)

  }

}

