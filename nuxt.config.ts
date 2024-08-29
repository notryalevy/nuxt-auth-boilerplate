// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint'],
    css: ['~/assets/css/tailwind.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    eslint: {
        config: {
            stylistic: {
                quotes: 'single',
                commaDangle: 'never',
                arrowParens: true,
                blockSpacing: true,
                indent: 4
            }
        }
    },
    runtimeConfig: {
        passwordSecret: process.env.PASSWORD_SECRET
    },
    app: {
        head: {
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'My awesome developer portfolio.'
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: 'Ayrton Levy - Fullstack Developer'
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: 'My awesome developer portfolio.'
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: 'website'
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: '/icons/circle-me.png'
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: 'https://notryalevy.fr'
                },
                { name: 'theme-color', content: '#010C15' }
            ],
            link: [
                {
                    rel: 'apple-touch-icon',
                    type: 'image/png',
                    href: '/icons/apple-touch-icon.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/icons/circle-me.png'
                },
                {
                    rel: 'manifest',
                    href: '/site.webmanifest'
                }
            ]
        }
    }
})
