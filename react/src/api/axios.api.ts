import axios from "axios";
import { getTokenFromLocalStorge } from "../helpers/LocalStorage.helper";

export const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorge(), 
    },
})

