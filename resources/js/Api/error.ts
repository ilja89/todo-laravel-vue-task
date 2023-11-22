function handleError(error: any, message?: string) {
    console.log(`Caught error:${message ? '\n' + message : ''}`, error)
    throw error
}

export {
    handleError
}
