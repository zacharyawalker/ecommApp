import axios from 'axios'

const base_api_url = import.meta.env.VITE_API_BASEURL
const api_call = '/mockups'

const MockupsAxios = axios.create({
    baseURL: base_api_url + api_call,
    timeout: 5000,
    headers:{
        "Content-Type":"application/json",
         accept: "application/json"
    }
})
export default MockupsAxios;