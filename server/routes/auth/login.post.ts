import { getUserByEmail } from '~/server/models/user'
import { LoginUserData } from '~/server/types/user'
import { LoginUserValidator } from '~/server/validators/LoginUserValidator'

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginUserData>(event)

    const validate = LoginUserValidator.safeParse(body)

    if (!validate.success)
        return createError({
            statusCode: 401,
            message: `Validate error: ${validate.error.message}`,
        })

    const userWithPassword = await getUserByEmail(validate.data.email)

    if (!userWithPassword)
        return createError({
            statusCode: 401,
            message: 'Les identifiants sont incorrect !',
        })

    const verifiedPassword = await verifyPassword(
        userWithPassword.password,
        validate.data.password,
    )

    if (!verifiedPassword)
        return createError({
            statusCode: 401,
            message: 'Les identifiants sont incorrect',
        })

    const config = useRuntimeConfig()
    const session = serialize({ userId: userWithPassword.id })
    const signedSession = sign(session, config.cookieSecret)

    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        expires: validate.data.rememberMe
            ? new Date(Date.now() + config.cookieRememberMeExpires)
            : new Date(Date.now() + config.cookieExpires),
    })

    const { password: _password, ...userWithoutPassword } = userWithPassword
    return {
        user: userWithoutPassword,
    }
})
