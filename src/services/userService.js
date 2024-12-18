import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const serviceAddNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const serviceDeleteUser = (userId) => {
    return axios.delete(`/api/delete-user`, { data: { id: userId } })
}

const serviceEditUser = (inputData) => {
    return axios.put(`/api/edit-user`, inputData)
}

export { handleLoginApi, getAllUser, serviceAddNewUser, serviceDeleteUser, serviceEditUser } 