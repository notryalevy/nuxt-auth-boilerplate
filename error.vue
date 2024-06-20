<script lang="ts" setup>
const error = useError()

const handleError = () => {
    clearError({
        redirect: '/',
    })
}
</script>

<template>
    <div
        class="flex h-screen flex-col items-center justify-center bg-neutral-950 px-8 text-white">
        <h1 class="text-9xl">{{ error.statusCode }}</h1>
        <p class="mt-7 text-center text-4xl">{{ error.message }}</p>
        <button
            @click="handleError"
            class="mt-7 rounded border-2 px-7 py-4 text-2xl font-semibold text-white transition hover:bg-neutral-200 hover:text-neutral-950">
            Go back
        </button>
    </div>
</template>
