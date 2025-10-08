// import our singleton for axios
import axios from '../interfaces/axiosInstance.js'

// GET all the payments from the API
export const getAllPayments = () => axios.get('/payments');

// GET a specific payment
export const getPaymentById = (id) => axios.get(`/payments/${id}`); // remember, to call a variable in-line, we don't use ' (single quote)
// we use backticks ` (left of the number 1)
// POST request, to create a new payment in our collection
export const createPayment = (paymentData) => axios.post('/payments', paymentData);

// PUT request, to update an existing payment
export const updatePayment = (id, paymentData) => axios.put(`/payments/${id}`, paymentData);

// DELETE request, delete a payment 
export const deletePayment = (id) => axios.delete(`/payments/${id}`);

// POST request to register user

export const RegisterUser = async (userData) => {
    try {
        const response = await axios.post(`/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }

}

// POST request to login user
// https://stackoverflow.com/questions/76508218/exporting-axios-response-using-react-js
// POST request to login user
export const LoginUser = async (userData) => {
    try {
        const response = await axios.post(`/auth/login`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }

}
