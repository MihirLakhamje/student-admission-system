import axios from "axios";


export async function login(input) {
  try {
    const { data } = await axios.post("/api/v1/users/login", input);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function register(input) {
  try {
    const { data } = await axios.post("/api/v1/users/signup", input);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function me(token) {
  try {
    const { data } = await axios.get("/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function logout(token) {
  try {
    await axios.get("/api/v1/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}
