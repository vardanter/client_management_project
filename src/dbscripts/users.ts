import { prisma, hashPassword } from "./utils"

type UserSignUpType = {
    name?: string | unknown
    email?: string | unknown
    password?: string | unknown
}

type UserManager = {
    email: string
    name: string | null
    isStaff?: boolean
}

export async function signUpAdminUser({name: fio, email: username, password}: UserSignUpType): Promise<UserManager | null> {
    if (!username || !password) {
        return null
    }
    try {
        const user = await prisma.user.create({
            data: {
              name: fio as string,
              email: username as string,
              password: hashPassword(password as string),
              is_staff: true
            },
        }) 
        
        const  { email, name } = user
        await prisma.$disconnect()
        return { email, name }
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }
    return null
}

export async function signUpUser({name: fio, email: username, password}: UserSignUpType): Promise<UserManager | null> {
    if (!username || !password) {
        return null
    }
    try {
        const user = await prisma.user.create({
            data: {
              name: fio as string,
              email: username as string,
              password: hashPassword(password as string)
            },
        }) 
        
        const  { email, name } = user
        await prisma.$disconnect()
        return { email, name }
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }
    return null
}

export async function signInUser({email: username, password}: UserSignUpType): Promise<UserManager | null> {
    if (!username || !password) {
        return null
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
              email: username as string,
            },
        }) 
        if (user && user.password !== hashPassword(password as string)) {
            throw new Error("User not found")
        } else if(user) {
            const  { email, name, is_staff: isStaff } = user
            await prisma.$disconnect()
            return { email, name, isStaff}
        }
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }
    return null
}

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    return user
}

export async function isAllowedAdmin(email: string) {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }
    })
    
    return user?.is_staff
}

