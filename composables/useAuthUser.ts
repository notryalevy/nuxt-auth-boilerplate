import type { UserWithoutPassword } from '~/server/types/user'

export const useAuthUser = () => {
    return useState<UserWithoutPassword | null>('user', () => null)
}
