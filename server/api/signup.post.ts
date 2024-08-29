import { Prisma } from '@prisma/client'
import prisma from '~/lib/prisma'
import { CreateUserType, CreateUserValidator } from '../validators/CreateUser'

export default eventHandler(async (event) => {
    const formData = await readFormData(event)

    const userFormData = {
        firstName: formData.get('first_name'),
        lastName: formData.get('last_name'),
        email: formData.get('email'),
        password: formData.get('password')
    }

    const userValidation = CreateUserValidator.safeParse(userFormData)

    if (!userValidation.success) {
        const message = userValidation.error.issues
            .map((val) => val.message)
            .join('-|-')
        throw createError({
            statusCode: 400,
            message
        })
    }

    const createUserData: CreateUserType = userValidation.data
    const passwordHash = await hashPassword(createUserData.password)

    try {
        const user = await prisma.user.create({
            data: {
                firstName: createUserData.firstName,
                lastName: createUserData.lastName,
                email: createUserData.email,
                password: passwordHash
            }
        })

        const session = await lucia.createSession(user.id, {})
        appendHeader(
            event,
            'Set-Cookie',
            lucia.createSessionCookie(session.id).serialize()
        )
    } catch (e) {
        if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === 'P2002'
        ) {
            throw createError({
                statusCode: 500,
                message: 'Adresse email invalide'
            })
        }
        console.error(e)
        throw createError({
            statusCode: 500,
            message: 'An unknown error occured'
        })
    }
})
