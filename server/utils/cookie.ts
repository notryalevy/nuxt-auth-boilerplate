import { createHmac, KeyObject, timingSafeEqual } from 'node:crypto'

export type CookieSecret = string | Buffer | KeyObject

export const serialize = (obj: object) => {
    const value = Buffer.from(JSON.stringify(obj), 'utf8').toString('base64')
    const length = Buffer.byteLength(value)

    if (length > 4096)
        throw createError({
            statusCode: 400,
            statusMessage: 'Mauvaise requête',
            message: 'Le cookie est trop large',
        })
    return value
}

export const deserialize = (value: string) => {
    return JSON.parse(Buffer.from(value, 'base64').toString('utf8'))
}

export const sign = (value: string, secret: CookieSecret) => {
    const signature = createHmac('sha256', secret)
        .update(value)
        .digest('base64')
        .replace(/=+$/, '')
    return `${value}.${signature}`
}

export const unsign = (input: string, secret: CookieSecret) => {
    const value = input.slice(0, input.lastIndexOf('.'))
    const expectedInput = sign(value, secret)
    const expectedBuffer = Buffer.from(expectedInput)
    const inputBuffer = Buffer.from(input)

    if (
        !(
            expectedBuffer.equals(inputBuffer) &&
            timingSafeEqual(expectedBuffer, inputBuffer)
        )
    )
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid cookie signature',
            message: 'Signature de cookie invalide',
        })
    return value
}
