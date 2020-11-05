export function getAccessToken() {
    return localStorage.getItem('token')
}

export function setAccessToken(accessToken: any) {
    return localStorage.setItem('token', accessToken)
}


export function removeAccessToken() {
    localStorage.removeItem('token')
}
