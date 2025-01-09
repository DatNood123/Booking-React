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

const serviceGetAllCode = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const serviceTopDoctorHome = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const serviceGetAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const serviceSaveInfoDoctors = (inputData) => {
    return axios.post(`/api/save-info-doctor`, inputData)
}

const serviceGetDetailDoctor = (doctorId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`)
}

const serviceSaveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const serviceGetScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const serviceGetExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

const serviceGetProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}


export {
    handleLoginApi, getAllUser, serviceAddNewUser,
    serviceDeleteUser, serviceEditUser, serviceGetAllCode,
    serviceTopDoctorHome, serviceGetAllDoctors,
    serviceSaveInfoDoctors, serviceGetDetailDoctor,
    serviceSaveBulkScheduleDoctor, serviceGetScheduleDoctorByDate,
    serviceGetExtraInfoDoctorById, serviceGetProfileDoctorById
} 