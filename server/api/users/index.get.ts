import { getUsers, isAdmin } from '~/server/models/user'

export default defineEventHandler(async (event) => {
    if (!isAdmin(event.context.user))
        throw createError({
            statusCode: 401,
            message:
                "Vous n'avez pas les droits requis pour accéder à cette ressource",
        })

    const users = await getUsers()

    return users.map(({ password, ...user }) => user)
})
