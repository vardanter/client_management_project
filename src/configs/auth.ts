import Credentials from "next-auth/providers/credentials"
import type {NextAuthConfig} from "next-auth"
import { User } from "next-auth"
import { signInUser, signUpUser } from "@/dbscripts/users"
import { cookies } from "next/headers"



export const authConfig: NextAuthConfig = {
    secret: `${process.env.AUTH_SECRET}`,
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            credentials: {
                username: {label: "email", type: "email", required: true},
                password: {label: "password", type: "password", required: true},
                name: {label: "name", type: "text", required: false},
                mode: {label: "mode", type: "text"}
            },
            async authorize(credentials) {
                try {
                    const {username, password, name, mode} = credentials

                    if (mode === "signin") {
                        const user = await signInUser({email: username, password})
                        if (user) {
                            return {
                                name: user.name,
                                email: user.email,
                                isStaff: user.isStaff ? 'true' : 'false',
                                id: user.isStaff ? '1' : '0'
                            } as User
                        }
                    } else {
                        const user = await signUpUser({name, email: username, password})
                        if (user) {
                            return user as User
                        }
                    }
                    return null
                } catch (error) {
                    return null
                }
            },
        })
    ],
    callbacks: {
        async session({session, user, token}) {
            session.user.isStaff = token.sub === '1' ? true : false
            return session
        }
    },
    pages: {
        signIn: '/',
        error: '/',
        signOut: '/signin'
    },
    events: {
        async signOut(message) {
            cookies().delete("is_staff")
        }
    }
}