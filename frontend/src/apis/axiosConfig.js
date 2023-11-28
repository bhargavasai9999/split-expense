import axios from 'axios'
// create axios instance
const api = axios.create({
  baseURL: 'https://split-expense.onrender.com',
})
export default api
