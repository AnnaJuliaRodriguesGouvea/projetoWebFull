import axios from "axios";

export async function login(email, password) {
    try {
        return await axios.post(`https://localhost:3001/login`, {
            email: email,
            password: password
        })

    } catch (err) {
        throw (err.response)
    }
}
