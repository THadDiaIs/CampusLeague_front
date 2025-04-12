import axios from "axios"

const apiUrl = 'http://localhost:8080/campus-league/api/';

const getToken = () => {
    return `Bearer ${localStorage.getItem("uid")}`;
}

const defaultHeaders = {
    "Content-Type": "application/json"
}

const Get = (endpoint: string, params: any, needAuth: boolean = false) => {
    return axios(
        {
            method: "get",
            params,
            url: `${apiUrl}${endpoint}`,
            headers: needAuth ? {
                ...defaultHeaders,
                Authorization: getToken(),
            } : defaultHeaders,
        }
    );
}

const Post = (endpoint: string, formData: any, needAuth: boolean = true) => {
    return axios({
        method: "post",
        url: `${apiUrl}${endpoint}`,
        data: formData,
        headers: needAuth ? {
            ...defaultHeaders,
            Authorization: getToken(),
        } : defaultHeaders,
    })
}

export { Get, Post }