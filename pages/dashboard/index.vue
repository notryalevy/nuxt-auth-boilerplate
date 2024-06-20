<script lang="ts" setup>
definePageMeta({
    middleware: ['user-only'],
})

const user = useAuthUser()
console.log(user.value)

const { logout } = useAuth()

const disconnect = async () => {
    await logout()
    await navigateTo('/auth/login')
}
</script>

<template>
    <h1 class="text-white">
        Bonjour {{ user?.firstName }} {{ user?.lastName }}
    </h1>
    <button class="py- rounded-xl bg-red-500 px-4" @click="disconnect">
        Déconnexion
    </button>
</template>
