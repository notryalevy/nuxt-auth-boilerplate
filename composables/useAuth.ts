import type {
    CreateUserData,
    LoginUserData,
    UserWithoutPassword,
} from '~/server/types/user'

export const useAuth = () => {
    const authUser = useAuthUser()

    const setUser = (user: any) => {
        authUser.value = user
    }

    const register = async (createUserData: CreateUserData) => {
        const data = await $fetch<{ user?: UserWithoutPassword }>(
            '/auth/register',
            { method: 'post', body: createUserData },
        )

        setUser(data.user)
        return authUser
    }

    const login = async (loginUserData: LoginUserData) => {
        const data = await $fetch<{ user?: UserWithoutPassword }>(
            '/auth/login',
            { method: 'post', body: loginUserData },
        )

        setUser(data.user)
        return authUser
    }

    const logout = async () => {
        const data = await $fetch('/auth/logout', { method: 'post' })

        setUser(data.user)
        return authUser
    }

    const me = async () => {
        if (!authUser.value) {
            try {
                const data = await $fetch('/auth/me', {
                    headers: useRequestHeaders(['cookie']) as HeadersInit,
                })

                setUser(data.user)
            } catch {}

            return authUser
        }
    }

    return {
        register,
        login,
        logout,
        me,
    }
}
