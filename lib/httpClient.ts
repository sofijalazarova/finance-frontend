import axios from "axios";


const httpClient = axios.create({
    baseURL: "http://localhost:8080", 
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true,
  })

export default httpClient;