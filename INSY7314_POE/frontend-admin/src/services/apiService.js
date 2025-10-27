import axios from '../interfaces/axiosInstance.js'

export const getUpdatedStatusPayments = () => axios.get('/payments/updatedStatus');

export const getPendingPayments = () => axios.get('/payments/pending');

export const getEmployees = () => axios.get('/adminauth/getEmployees');

export const deleteEmployee = (id) => axios.delete(`/adminauth/deleteEmployee/${id}`);

export const updateStatus = (id, status) => axios.put(`/payments/updateStatus/${id}/${status}`);

// Logging out
export const Logout = () => axios.get('/adminauth/logout');

// POST request to login user (Sanchez,2023)
export const LoginAdmin = async (userData) => {
    try {
        const response = await axios.post(`/adminauth/adminLogin`, userData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const RegisterAdmin = async (userData) => {
    try {
        const response = await axios.post(`/adminauth/adminRegister`, userData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }

}

// Fetching the user detaisl
export const fetchUserDetails = async (token) => {
    // this is the BASE URL
    return await axios.get('/adminauth/getUserDetails', {
        withCredentials: true,
    });
};