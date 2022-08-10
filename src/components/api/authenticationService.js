import React from "react";
import axios from 'axios';

{/**save tokent in localstorage */}
export const getToken = () => {
    return localStorage.getItem('token');
}

{/**Save current organization id to localstorage */}
export const getOrganId = () => {
    return localStorage.getItem("CurrentOrganization")
}

{/** process user login  */}
export const userLogin = (authRequest) => {
    return axios({
        'method': 'POST',
        'url': `${process.env.hostUrl || 'http://localhost:8080'}/auth/login`,
        'data': authRequest
    })
}

{/**Get userdata  */}
export const fetchUserData = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/auth/userinfo`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

{/**Get organization */}
export const fetchOrganizations = () => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/organs`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}