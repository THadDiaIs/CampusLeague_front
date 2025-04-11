import axios from "axios"
import { Login } from "../../types/login.type"
const apiUrl = 'http://localhost:8080/campus-league/api/';

export async function apiGet(){
    return axios.get('/campeonato')
    .then(resp => resp.data)
    .catch(err => console.log(err))
}
export async function login(params: Login){
    return axios.post(`${apiUrl}auth/login`,params)
    .then(resp => console.log(resp.data))
    .catch(err => console.log(err))
}