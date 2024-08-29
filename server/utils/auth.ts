import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { User } from '@prisma/client'
import { Lucia, TimeSpan } from 'lucia'
import prisma from '~/lib/prisma'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        // name: 'cookiename',
        attributes: {
            secure: !import.meta.dev
        }
    },
    sessionExpiresIn: new TimeSpan(1, 'w'),
    getUserAttributes: (attributes) => {
        return {
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            email: attributes.email,
            role: attributes.role
        }
    }
})

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: Omit<User, 'id'>
    }
}
