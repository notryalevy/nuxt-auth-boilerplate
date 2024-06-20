import { PrismaClient, User } from '@prisma/client'
import { CreateUserData, UpdateUserData } from '~/server/types/user'

const { user } = new PrismaClient()

export const getUsers = () => {
    return user.findMany()
}

export const createUser = async (userData: CreateUserData) => {
    return user.create({
        data: {
            email: userData.email,
            password: await hashPassword(userData.password),
            firstName: userData.firstName,
            lastName: userData.lastName,
        },
    })
}

export const updateUser = async (id: string, userData: UpdateUserData) => {
    if (userData.password)
        userData.password = await hashPassword(userData.password)
    return user.update({
        where: {
            id,
        },
        data: userData,
    })
}

export const deleteUser = async (id: string) => {
    return user.delete({
        where: {
            id,
        },
    })
}

export const getUserByEmail = (email: string) => {
    return user.findUnique({
        where: {
            email,
        },
    })
}

export const getUserById = (id: string) => {
    return user.findUnique({
        where: {
            id,
        },
    })
}

export const isAdmin = (user?: User) => {
    return user && user.role === 'ADMIN'
}
