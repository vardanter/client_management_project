import { PrismaClient } from "@prisma/client"
import { SHA256 as sha256 } from "crypto-js";

// create new connection
const prisma = new PrismaClient()
export {prisma}

// password hashing
export const hashPassword = (password: string) => sha256(password).toString()