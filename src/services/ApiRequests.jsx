import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const signUp = async (username, email, password, passwordConfirmation) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/sign_up`, {
      user: {
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/sign_in`, {
      user: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteRoom = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/rooms/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const apiRequests = {
  signUp,
  login,
  deleteRoom,
};

export default apiRequests;
