import axios from "axios";

export async function getAllApplicaitons(currentPage, token) {
  try {
    const { data } = await axios.get(`/api/v1/applications/admin/?page=${currentPage}&pageSize=8`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function createApplication(data, token) {
  try {
    await axios.post("/api/v1/applications", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

// user data
export async function myApplication(userId, token) {
  try {
    const { data } = await axios.get(
      `/api/v1/applications/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
}

export async function getApplication(applicationId, token) {
  try {
    const { data } = await axios.get(
      `/api/v1/applications/admin/${applicationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
}

export async function approvalApplication(applicationId, input, token) {
  try {
    await axios.post(
      `/api/v1/applications/admin/${applicationId}`,
      input,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  } 
}