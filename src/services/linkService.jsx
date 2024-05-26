// services/linkService.jsx
import axios from 'axios';
import { baseUrl } from './userService';


export const getUserLinks = (userId) => {
    const token = localStorage.getItem('accessToken');
    return axios.get(`${baseUrl}/users/${userId}/links`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getLinkById = (linkId) => {
    const token = localStorage.getItem('accessToken');
    return axios.get(`${baseUrl}/links/${linkId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const addLink = (linkData) => {
    const token = localStorage.getItem('accessToken');
    return axios.post(`${baseUrl}/links/${linkData.userId}`, linkData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const addTarget = (id, target) => {
    const token = localStorage.getItem('accessToken');
    return axios.post(`${baseUrl}/links/${id}/target`, target, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const deleteLink = (userId, linkId) => {
    const token = localStorage.getItem('accessToken');
    return axios.delete(`${baseUrl}/links/${userId}/${linkId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
