import { getUsers } from '~/server/models/user'

export default defineEventHandler(async (event) => {
    const users = await getUsers()

    return users.length !== 0
})
