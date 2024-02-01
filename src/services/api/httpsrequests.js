import axios from 'axios'
import API_BASE_URL from './api_base_url'

export async function registerUser(payload){
    let newUser
    await axios.post(`${API_BASE_URL}/users/register`, payload).then((res)=>{
        res.data = newUser
    })
    return newUser
}