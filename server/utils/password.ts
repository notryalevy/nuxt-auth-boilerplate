import { argon2id, hash, verify } from 'argon2'

export const hashPassword = (password: string) => {
    const config = useRuntimeConfig()

    return hash(password, {
        secret: Buffer.from(config.passwordSecret),
        type: argon2id,
        memoryCost: 19456,
        timeCost: 2,
        parallelism: 1
    })
}

export const verifyPassword = (hash: string, password: string) => {
    const config = useRuntimeConfig()

    return verify(hash, password, {
        secret: Buffer.from(config.passwordSecret)
    })
}
