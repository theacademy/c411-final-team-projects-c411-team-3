import api from "./api";

export const createRequest = async (requestData) => {
    try {
        const response = await api.post("/request", requestData);
        return response.data;
    } catch (error) {
        console.error("Error during submiting request:", error);
        throw error;
    }
};

export const updateRequest = async (requestId, petId, status) => {
    try {
        console.log("requestId:" + requestId + "petId: " + petId + " status: " + status);
       /* const response = await api.put(`/request/${requestId}`, {
            requestId,
            petId,
            status,
        }); */
        const requestData = {
            status: status
        };

        const response = await api.put(`/request/${requestId}`, requestData);
        return response.data;
    } catch (error) {
        const errorMessage =
            typeof error.response?.data === "string"
                ? error.response.data
                : error.response?.data?.error || "Failed to update request";

        throw errorMessage;
    }
};

export const cancelRequest = async (requestId) => {
    try {
        const response = await api.delete(`/request/${requestId}`);
        return response.data;
    } catch (error) {
        const errorMessage =
            typeof error.response?.data === "string"
                ? error.response.data // If backend sends a string error
                : error.response?.data?.error || "Failed to cancel request"; // Fallback message

        throw errorMessage;
    }
};

export const viewRequest = async (requestId) => {
    try {
        const response = await api.get(`/request/${requestId}`);
        return response.data;
    } catch (error) {
        const errorMessage =
            typeof error.response?.data === "string"
                ? error.response.data // If backend sends a string error
                : error.response?.data?.error || "Failed to fetch request"; // Fallback message

        throw errorMessage;
    }
};

export const viewRequestByUserId = async (userId) => {
    try {
        const response = await api.get(`/requests/userid/${userId}`);
        return response.data;
    } catch (error) {
        const errorMessage =
            typeof error.response?.data === "string"
                ? error.response.data // If backend sends a string error
                : error.response?.data?.error || "Failed to fetch request"; // Fallback message

        throw errorMessage;
    }
};

