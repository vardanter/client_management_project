import { NextResponse } from "next/server"
import { auth } from "./auth"

const publicRoutes = ['/signin', '/signup', '/']

export default auth((req) => {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)
    const local = req.cookies.get("local")?.value || process.env.DEFAULT_LANGUAGE

    if(!isPublicRoute && !req.auth) {
        return NextResponse.redirect(new URL(`/`, req.nextUrl))
    }
})

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] } 