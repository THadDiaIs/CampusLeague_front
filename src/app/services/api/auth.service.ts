import { Login } from "../../types/login.type"
import { Post } from "./api.generic";


export async function login(params: Login) {
    return Post("auth/login", params, false)
        .then(resp => {
            const { token } = resp.data;
            if (token) {
                window.localStorage.setItem("uid", token);
            }
            return resp.status;
        })
        .catch(err => {
            console.log(err.data);
            return err.status;
        })
}