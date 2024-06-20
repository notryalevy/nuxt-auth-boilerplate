import { H3Event } from 'h3'
import { getUserById } from '~/server/models/user'

export const getUserFromSession = async (event: H3Event) => {
    const config = useRuntimeConfig()

    const cookie = getCookie(event, config.cookieName)

    if (!cookie) return undefined

    const unsignedSession = unsign(cookie, config.cookieSecret)
    if (!unsignedSession) return undefined

    const session = deserialize(unsignedSession)
    return getUserById(session.userId)
}
