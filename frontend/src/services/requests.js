import api from './api';

export const getAllRequests = async () => {
  try {
    const response = await api.get('/requests');
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error; // Re-throw the error so the component can handle it
  }
};