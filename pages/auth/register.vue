<script lang="ts" setup>
definePageMeta({
    middleware: ['unauthenticated']
})

const registerForm = reactive<{ errors: string[]; pending: boolean }>({
    errors: [],
    pending: false
})

const register = async (e: Event) => {
    registerForm.errors.length = 0

    try {
        registerForm.pending = true

        await $fetch('/api/signup', {
            method: 'post',
            body: new FormData(e.target as HTMLFormElement)
        })
        await navigateTo('/admin/')
    } catch (err) {
        if (isFetchError(err)) {
            const message = err.data.message as string
            message.split('-|-').forEach((val) => registerForm.errors.push(val))
        }
    } finally {
        registerForm.pending = false
    }
}
</script>

<template>
    <div class="flex h-screen select-none items-center justify-center px-4">
        <div class="w-full md:w-1/2 lg:w-2/6">
            <form
                @submit.prevent="register"
                class="min-w-full rounded-xl bg-neutral-900 p-6 shadow-lg ring-1 ring-white/15 md:p-10">
                <h1 class="mb-6 text-center font-sans text-2xl font-bold">
                    Devordia Nuxt Boilerplate
                </h1>
                <h3 class="mb-6 text-center font-sans text-xl font-bold">
                    Inscription
                </h3>

                <!-- Error handling -->
                <ul
                    v-if="registerForm.errors.length > 0"
                    class="rounded-xl bg-red-500 p-4 ring-red-300">
                    <li v-for="message in registerForm.errors">
                        • {{ message }}
                    </li>
                </ul>

                <div class="mt-4">
                    <label
                        for="first_name"
                        class="text-md my-3 block font-semibold"
                        >Prénom</label
                    >
                    <input
                        class="w-full rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-1.5 focus:border-red-500 focus:outline-none"
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="John"
                        required />
                </div>
                <div class="mt-4">
                    <label
                        for="last_name"
                        class="text-md my-3 block font-semibold"
                        >Nom de famille</label
                    >
                    <input
                        class="w-full rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-1.5 focus:border-red-500 focus:outline-none"
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Doe"
                        required />
                </div>
                <div class="mt-4">
                    <label for="email" class="text-md my-3 block font-semibold"
                        >Email</label
                    >
                    <input
                        class="w-full rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-1.5 focus:border-red-500 focus:outline-none"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john.doe@exemple.com"
                        required />
                </div>
                <div class="mt-4">
                    <label
                        for="password"
                        class="text-md my-3 block font-semibold"
                        >Mot de passe</label
                    >
                    <input
                        class="w-full rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-1.5 focus:border-red-500 focus:outline-none"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="**********"
                        required />
                </div>
                <div class="mt-6 flex flex-col md:flex-row md:space-x-4">
                    <button
                        type="submit"
                        :disabled="registerForm.pending"
                        class="w-full rounded-lg bg-red-600 px-4 py-1.5 font-sans text-lg font-semibold tracking-wide text-white hover:bg-red-400">
                        S'enregistrer
                    </button>
                </div>
                <div class="mt-6 flex flex-col md:flex-row md:space-x-4">
                    <NuxtLink
                        to="/auth/login"
                        class="w-full rounded-lg bg-neutral-700 px-4 py-1.5 text-center font-sans text-lg font-semibold tracking-wide text-white hover:bg-neutral-400">
                        Se connecter
                    </NuxtLink>
                </div>
            </form>
        </div>
    </div>
</template>
