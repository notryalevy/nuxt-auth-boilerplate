import { argon2id, hash, verify } from 'argon2'

export const hashPassword = (password: string) => {
    const config = useRuntimeConfig()

    return hash(password, {
        secret: Buffer.from(config.passwordSecret),
        type: argon2id,
    })
}

export const verifyPassword = (hash: string, password: string) => {
    const config = useRuntimeConfig()

    return verify(hash, password, {
        secret: Buffer.from(config.passwordSecret),
    })
}
