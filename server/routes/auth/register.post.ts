import { ZodError } from 'zod'
import { createUser } from '~/server/models/user'
import { CreateUserData } from '~/server/types/user'
import { CreateUserValidator } from '~/server/validators/CreateUserValidator'

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateUserData>(event)

    try {
        let validate = CreateUserValidator.parse(body)

        const user = await createUser({
            email: validate.email,
            password: validate.password,
            firstName: validate.firstName,
            lastName: validate.lastName,
        })

        const config = useRuntimeConfig()
        const session = serialize({ userId: user.id })
        const signedSession = sign(session, config.cookieSecret)

        setCookie(event, config.cookieName, signedSession, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + config.cookieExpires),
        })

        const { password: _password, ...userWithoutPassword } = user

        return {
            user: userWithoutPassword,
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return error.issues
        } else {
            console.error(error)
            throw createError({
                statusCode: 500,
                statusMessage: 'Erreur inconnue',
                message: `${error}`,
            })
        }
    }
})
