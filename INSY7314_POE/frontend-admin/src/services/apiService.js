// import our singleton for axios 
import axios from '../interfaces/axiosInstance.js'

// GET the updated status of the payments from the API
export const getUpdatedStatusPayments = () => axios.get('/payments/updatedStatus');

// GET pending payments from the API
export const getPendingPayments = () => axios.get('/payments/pending');

// GET employees from the API
export const getEmployees = () => axios.get('/adminauth/getEmployees');

// DELETE request, delete an employee 
export const deleteEmployee = (id) => axios.delete(`/adminauth/deleteEmployee/${id}`);

// PUT request, to update the payment status
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

// POST request to register user (Sanchez,2023)
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

// References 
// Sanchez, E., 2023.Exporting Axios Response using React JS. [online] Available at: <https://stackoverflow.com/questions/76508218/exporting-axios-response-using-react-js> [Accessed 24 September 2025].
