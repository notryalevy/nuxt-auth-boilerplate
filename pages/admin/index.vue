<script lang="ts" setup>
definePageMeta({
    middleware: ['authenticated']
})
const user = useAuthenticatedUser()

const logout = async () => {
    try {
        await $fetch('/api/signout', { method: 'post' })
        await navigateTo('/auth/login')
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <div
        class="m-8 block h-32 rounded-lg bg-slate-800 text-center text-lg text-slate-100">
        <div class="p-4">
            <p>Bienvenue {{ user.firstName }} {{ user.lastName }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Role: {{ user.role }}</p>
            <form @submit="logout">
                <button
                    type="submit"
                    class="mt-2 flex justify-center rounded-lg border border-slate-500 bg-slate-900 p-2 hover:border-slate-900 hover:bg-slate-500">
                    Déconnexion
                </button>
            </form>
        </div>
    </div>
</template>
