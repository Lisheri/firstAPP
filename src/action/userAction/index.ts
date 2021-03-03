const changeToken = (token: string) => {
    return {
        type: 'changeToken',
        value: token,
    }
}

export default {
    changeToken
}