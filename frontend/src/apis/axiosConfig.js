import axios from "axios";
// create axios instance
const api=axios.create({
    baseURL:"http://localhost:5000"
})
export default api;