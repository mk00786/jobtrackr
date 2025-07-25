import axios from 'axios'

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type':'application/json',
    },
});

//Intercept 401 errors (token expired or invalid)
api.interceptors.response.use(
    res=>res,
    err=>{
        if(err.response?.status===401){
            localStorage.clear();
            window.location.href='/login';
        }
        return Promise.reject(err);
    }
);

export default api;