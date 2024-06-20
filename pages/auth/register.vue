<script lang="ts" setup>
import { ZodError, type ZodIssue } from 'zod'
import {
    CreateUserValidator,
    type CreateUserValidatorType,
} from '~/server/validators/CreateUserValidator'

definePageMeta({
    middleware: ['uninstalled-only'],
})

const { register } = useAuth()

const form = reactive<{
    userData: CreateUserValidatorType
    pending: boolean
    errors: ZodIssue[]
    messages: string[]
}>({
    userData: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    },
    pending: false,
    errors: [],
    messages: [],
})

const submitRegistration = async () => {
    try {
        form.pending = true
        CreateUserValidator.parse(form.userData)

        await register(form.userData)
        await navigateTo('/dashboard')
    } catch (error: any) {
        if (error instanceof ZodError) form.errors = error.issues
    } finally {
        form.pending = false
    }
}
</script>

<template>
    <div class="flex h-screen items-center justify-center px-4">
        <div class="w-full md:w-1/2 lg:w-2/6">
            <form
                @submit.prevent="submitRegistration"
                class="min-w-full rounded-xl bg-neutral-900 p-6 shadow-lg ring-1 ring-white/15 md:p-10">
                <h1 class="mb-6 text-center font-sans text-2xl font-bold">
                    ReprogTaVoiture
                </h1>
                <h3 class="mb-6 text-center font-sans text-xl font-bold">
                    S'inscrire
                </h3>
                <ul
                    v-if="form.errors.length > 0"
                    class="rounded-xl bg-red-500 p-4 ring-1 ring-red-300">
                    <li v-for="message in form.errors">
                        • {{ message.message }}
                    </li>
                </ul>
                <div class="flex flex-col md:flex-row md:space-x-4">
                    <div class="w-full md:w-1/2">
                        <label
                            class="text-md my-3 block font-semibold"
                            for="first_name"
                            >Prénom</label
                        >
                        <input
                            class="w-full rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-1.5 focus:border-red-500 focus:outline-none"
                            type="text"
                            name="first_name"
                            id="first_name"
                            placeholder="Prénom"
                            v-model="form.userData.firstName" />
                    </div>
                    <div class="mt-4 w-full md:mt-0 md:w-1/2">
                        <label
                            class="text-md my-3 block font-semibold"
                            for="last_name"
                            >Nom de famille</label
                        >
                        <input
                            class="w-full rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-1.5 focus:border-red-500 focus:outline-none"
                            type="text"
                            name="last_name"
                            id="last_name"
                            placeholder="Nom de famille"
                            v-model="form.userData.lastName" />
                    </div>
                </div>
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
                <div class="mt-4">
                    <label
                        class="text-md my-3 block font-semibold"
                        for="confirm"
                        >Confirmez votre mot de passe</label
                    >
                    <input
                        class="w-full rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-1.5 focus:border-red-500 focus:outline-none"
                        type="password"
                        name="confirm"
                        id="confirm"
                        placeholder="Confirmez votre mot de passe"
                        v-model="form.userData.confirmPassword" />
                </div>
                <div class="mt-6 flex flex-col md:flex-row md:space-x-4">
                    <div class="w-full md:w-1/2">
                        <button
                            type="submit"
                            class="w-full rounded-lg bg-red-600 px-4 py-1.5 font-sans text-lg font-semibold tracking-wide text-white hover:bg-red-400">
                            S'inscrire
                        </button>
                    </div>
                    <div class="mt-4 w-full md:mt-0 md:w-1/2">
                        <NuxtLink
                            to="/auth/login"
                            class="block w-full rounded-lg bg-neutral-600 px-4 py-1.5 text-center font-sans text-lg font-semibold tracking-wide hover:bg-neutral-400">
                            Connexion
                        </NuxtLink>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
