export default defineNuxtRouteMiddleware(async () => {
    const isInstalled = await useInstalled()

    if (isInstalled)
        return abortNavigation(
            "Si vous avez besoin d'un compte veuillez contacter l'administrateur",
        )
})
