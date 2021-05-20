import jwtDecode from "jwt-decode";

const logout = () => {
    window.localStorage.removeItem('authToken')
}

const setup = () => {
    const authToken = window.localStorage.getItem('authToken')
    if (authToken) {
        const {exp: expiration} = jwtDecode(authToken)
        if (expiration * 1000 < new Date().getTime()) {
            logout()
        }
    }else {
        logout()
    }
}

const isAuthenticated = () => {
    const authToken = window.localStorage.getItem('authToken')
    if (authToken) {
        const {exp: expiration} = jwtDecode(authToken)
        if (expiration * 1000 < new Date().getTime()) {
            logout()
            return false
        }
        return true
    }
}

export default {
    setup,
    logout,
    isAuthenticated
}