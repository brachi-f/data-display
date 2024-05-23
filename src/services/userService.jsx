import axios from "axios"

export const baseUrl = "http://localhost:3000"
export const Login = (user) => {
    return axios.post(baseUrl + '/login', user)
}