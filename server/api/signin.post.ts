import prisma from '~/lib/prisma'
import { LoginUserValidator } from '../validators/LoginUser'

export default eventHandler(async (event) => {
    const formData = await readFormData(event)

    const userFormData = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const userValidation = LoginUserValidator.safeParse(userFormData)

    if (!userValidation.success) {
        const message = userValidation.error.issues
            .map((val) => val.message)
            .join('-|-')
        throw createError({
            statusCode: 400,
            message
        })
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: userValidation.data.email
        }
    })

    const validPassword = await verifyPassword(
        existingUser?.password ??
            '$argon2id$v=19$m=19456,t=2,p=1$E6/J/9EgewFKAS9mXBXJwQ$fEkZklbc6EwIL0jAKBnVfgUPnYPPAEqsiyYGOf5azeQ',
        userValidation.data.password
    )

    if (!existingUser || !validPassword)
        throw createError({
            statusCode: 400,
            message: 'Identifiants incorrect !'
        })

    const session = await lucia.createSession(existingUser.id, {})

    appendHeader(
        event,
        'Set-Cookie',
        lucia.createSessionCookie(session.id).serialize()
    )
})
