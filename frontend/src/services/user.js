import api from "./api";

export const registerUser = async (username, email, password, phoneNumber) => {
  try {
    const response = await api.post("/users", {
      username,
      email,
      password,
      phoneNumber, // New field added
      role: "ADOPTER", // Automatically set role
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};