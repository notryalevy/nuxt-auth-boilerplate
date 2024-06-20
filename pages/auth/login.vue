<script lang="ts" setup>
import { ZodError, type ZodIssue } from 'zod'
import type { LoginUserData } from '~/server/types/user'
import { LoginUserValidator } from '~/server/validators/LoginUserValidator'

definePageMeta({
    middleware: ['guest-only'],
})

const { login } = useAuth()

const form = reactive<{
    userData: LoginUserData
    errors: ZodIssue[]
    pending: boolean
}>({
    userData: {
        email: '',
        password: '',
        rememberMe: false,
    },
    errors: [],
    pending: false,
})

const submitLogin = async () => {
    try {
        form.pending = true

        LoginUserValidator.parse(form.userData)

        await login(form.userData)
        await navigateTo('/dashboard')
    } catch (error) {
        if (error instanceof ZodError) form.errors = error.issues
    } finally {
        form.pending = false
    }
}
</script>
<template>
    <div
        class="flex h-screen select-none items-center justify-center bg-neutral-950 px-4">
        <div class="w-full md:w-1/2 lg:w-2/6">
            <form
                @submit.prevent="submitLogin"
                class="min-w-full rounded-xl bg-neutral-900 p-6 shadow-lg ring-1 ring-white/15 md:p-10">
                <h1 class="mb-6 text-center font-sans text-2xl font-bold">
                    ReprogTaVoiture
                </h1>
                <h3 class="mb-6 text-center font-sans text-xl font-bold">
                    Se connecter
                </h3>

                <ul
                    v-if="form.errors.length > 0"
                    class="rounded-xl bg-red-500 p-4 ring-1 ring-red-300">
                    <li v-for="message in form.errors">
                        • {{ message.message }}
                    </li>
                </ul>

                <div class="mt-4">
                    <label class="text-md my-3 block font-semibold" for="email"
                        >Email</label
                    >
                    <input
                        class="w-full rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-1.5 focus:border-red-500 focus:outline-none"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="john.doe@exemple.com"
                        v-model="form.userData.email" />
                </div>
                <div class="mt-4">
                    <label
                        class="text-md my-3 block font-semibold"
                        for="password"
                        >Mot de passe</label
                    >
                    <input
                        class="w-full rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-1.5 focus:border-red-500 focus:outline-none"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mot de passe"
                        v-model="form.userData.password" />
                </div>
                <div class="mb-5 mt-4 flex items-start">
                    <div class="flex h-5 items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            v-model="form.userData.rememberMe"
                            class="focus:ring-3 0 h-4 w-4 rounded border border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-blue-600 focus:ring-offset-gray-800" />
                    </div>
                    <label
                        for="remember_me"
                        class="ms-2 text-sm font-medium text-gray-300"
                        >Se souvenir de moi</label
                    >
                </div>

                <div class="mt-6 flex flex-col md:flex-row md:space-x-4">
                    <button
                        type="submit"
                        class="w-full rounded-lg bg-red-600 px-4 py-1.5 font-sans text-lg font-semibold tracking-wide text-white hover:bg-red-400">
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
