import { User } from '@prisma/client'

export type UserWithoutPassword = Omit<User, 'password'>

export type CreateUserData = Omit<User, 'id' | 'role' | 'verified'>

export type LoginUserData = {
    email: string
    password: string
    rememberMe: boolean
}

export type UpdateUserData = Partial<CreateUserData>
