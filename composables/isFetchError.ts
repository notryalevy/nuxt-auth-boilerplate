export const isFetchError = (err: any): err is { data: { message: string }} => {
    return (err && typeof err === 'object' && 'data' in err && 'message' in err.data && typeof err.data.message === 'string')
}