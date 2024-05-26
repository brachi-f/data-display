import axios from "axios"

export const baseUrl = "http://localhost:3000"
export const Login = (user) => {
    return axios.post(baseUrl + '/login', user)
}
export const getUser = (id) => {
    const token = localStorage.getItem('accessToken')
    return axios.get(baseUrl + `/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
}
export const Register = (userDetails) => {
    return axios.post(`${baseUrl}/register`, userDetails)
}
export const getTokenData = () => {
    const token = localStorage.getItem('accessToken')
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )
    const obj = JSON.parse(jsonPayload)
    return obj
}