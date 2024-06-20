const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
    runtimeConfig: {
        cookieName: process.env.COOKIE_NAME,
        cookieSecret: process.env.COOKIE_SECRET,
        cookieExpires: parseInt(ONE_DAY.toString()),
        cookieRememberMeExpires: parseInt(ONE_WEEK.toString()),
        passwordSecret: process.env.PASSWORD_SECRET,
    },
})

