export const useInstalled = async () => {
    const data: boolean = await $fetch('/api/setup/installed', {
        method: 'get',
    })
    return data
}
