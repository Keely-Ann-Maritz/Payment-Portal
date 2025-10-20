// import our singleton for axios
import axios from '../interfaces/axiosInstance.js'

// GET all the payments from the API
export const getAllPayments = () => axios.get('/payments');

// GET all payments for a specific username
export const getPaymentByUsername = (username) => axios.get(`/payments/${username}`); 

// POST request, to create a new payment in our collection
export const createPayment = (paymentData) => axios.post('/payments', paymentData);

// PUT request, to update an existing payment
export const updatePayment = (id, paymentData) => axios.put(`/payments/${id}`, paymentData);

// DELETE request, delete a payment 
export const deletePayment = (id) => axios.delete(`/payments/${id}`);

// Logging out
export const Logout = () => axios.get('/auth/logout');

// POST request to register user (Sanchez,2023)
export const RegisterUser = async (userData) => {
    try {
        const response = await axios.post(`/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }

}

// POST request to login user (Sanchez,2023)
export const LoginUser = async (userData) => {
    try {
        const response = await axios.post(`/auth/login`, userData, {
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
        return await axios.get('/auth/getUserDetails', {
        withCredentials: true,
    });
};

    

// References 
// Sanchez, E., 2023.Exporting Axios Response using React JS. [online] Available at: <https://stackoverflow.com/questions/76508218/exporting-axios-response-using-react-js> [Accessed 24 September 2025].
