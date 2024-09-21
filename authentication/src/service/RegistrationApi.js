import axios from 'axios';

export const registerUser = async (userData) => {

     
  
    try {
        // Make a POST request to your backend API endpoint
        const response = await axios.post('http://localhost:5000/api/auth/signup', userData);

        
        return response;
    } catch (error) {
        // If an error occurs, throw it to be handled by the calling code
        throw error;
    }
};
