import environment from './constant.js';
import axios from 'axios';
import cookie from '../utils/cookies.js'

const API = {
    createUser: async (data)=>{
       return await axios.post(`${environment.BASE_URL}/user/create`,{
            username: data.username,
            email: data.email,
            password: data.password
        });
    },

    resetPassword: async (data)=>{
        return await axios.post(`${environment.BASE_URL}/user/reset`,{
            id: data.id, 
            password: data.password,
            confirmPassword: data.confirmPassword
        });
    },

    loginUser: async (data)=>{
        return await axios.post(`${environment.BASE_URL}/user/login`,{
            email: data.email,
            password: data.password
        });
    },

    getLoggedinUserInfo: async ()=>{
        return await axios.get(`${environment.BASE_URL}/user/get`,{headers: {'Authorization': `Bearer ${cookie.getCookie('token')}`}});
    },

    getALLChat: async ()=>{
        return await axios.get(`${environment.BASE_URL}/chat/get`,{headers: {'Authorization': `Bearer ${cookie.getCookie('token')}`}});
    },

    getFileInfoForDownload: async (socketId)=>{
        return await axios.get(`${environment.BASE_URL}/user/download/file/${socketId}`,{headers: {'Authorization': `Bearer ${cookie.getCookie('token')}`}});
    },

    UploadFile: async (data)=>{
        return await axios.post(`${environment.BASE_URL}/user/file`,data,{
                    headers: {'Authorization': `Bearer ${cookie.getCookie('token')}`, "Content-Type": "multipart/form-data" }
                });
    },

    addNewChat: async (data)=>{
        return await axios.post(`http://localhost:8000/chat/add`,{
                message: data.newMessage,
                sender: data.username,
                receiver: "ahmed"
                },{headers: {'Authorization': `Bearer ${cookie.getCookie('token')}`}});
    }
}

export default API;