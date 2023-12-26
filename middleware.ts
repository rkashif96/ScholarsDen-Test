import { cookies } from "next/headers"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"
const verify = (token: string, sk: string) => {
    if (token != '') {
        return true;
    }
    return false
}
const Response = (obj: any, status: any) => {
    return NextResponse.json({ obj, status })
}
export function middleware(request: NextRequest) {
    try {
        const token = cookies().get("token")?.value || ''
        const decoded = verify(String(token), 'mySecretKey')
        if (!decoded ) { return Response({ status: 400, message: 'User Not Logged In.' }, 400) }
    } catch (error) {
        console.log(error)
    }

}

export const config = {
    matcher: ['/api/country','/api/logout'],
}