import moment from "moment"
export default function (Vue) {
    Vue.auth = {
        setToken(token, expiration) {
            localStorage.setItem("token", token)
            localStorage.setItem("token_expiration", expiration)
        },
        getToken() {
            let token = localStorage.getItem("token")
            let expiration = localStorage.getItem("token_expiration")

            if (!token || !expiration) {
                return null
            }
            if (moment().unix() > parseInt(expiration)) {
                this.destroyToken()
                return null
            } else {
                return token
            }
        },
        destroyToken() {
            localStorage.removeItem("token", token)
            localStorage.removeItem("token_expiration", expiration)
        },
        isAuthenticated() {
            if (this.getToken()) {
                return true
            } else {
                return false
            }
        }
    }
    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: () => {
                return Vue.auth;
            }
        }
    })
}