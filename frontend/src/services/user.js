import api from "./api";

export const registerUser = async (username, email, password, phoneNumber) => {
  try {
    const response = await api.post("/users/register", {
      username,
      email,
      password,
      phoneNumber,
      role: "ADOPTER",
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/users/login", { username, password });
    return response.data;
  } catch (error) {
    const errorMessage =
        typeof error.response?.data === "string"
            ? error.response.data // If backend sends a string error
            : "Login failed"; // Fallback error message

    throw errorMessage;
  }
};
export const updateUserInfo = async (userId, userInfo) => {
  try {
    const response = await api.put(`/users/${userId}/info`, userInfo);
    return response.data;
  } catch (error) {
    const errorMessage =
        typeof error.response?.data === "string"
            ? error.response.data // If backend sends a plain string error
            : error.response?.data?.error || "Failed to update profile"; // Fallback message

    throw errorMessage;
  }
};

