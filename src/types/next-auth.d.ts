import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

import { DefaultSession } from "next-auth"

type UserStaff = string | unknown

declare module 'next-auth/jwt' {
  interface JWT {
    isStaff: UserStaff
  }
}

declare module 'next-auth' {
    interface User {
        isStaff: UserStaff
    }

    interface Session {
        user: User & {
            isStaff: UserStaff
        }
    }
}