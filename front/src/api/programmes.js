import axios from "axios";

export async function getProgramme(token, programmeId) {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/programmes/${programmeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error.response?.data?.message);
  }
}
export async function addProgramme(data, token) {
  try {
    await axios.post("http://localhost:8000/api/v1/programmes", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.response?.data?.message);
  }
}

export async function getAllProgrammes(currentPage) {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/programmes?page=${currentPage}&pageSize=8`,
    );

    return data;
  } catch (error) {
    console.log(error.response?.data?.message);
  }
}

export async function updateProgramme(data, token, programmeId) {
  try {
    await axios.patch(
      `http://localhost:8000/api/v1/programmes/${programmeId}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log(error.response?.data?.message);
  }
}

export async function deleteProgramme(token, programmeId) {
  try {
    await axios.delete(
      `http://localhost:8000/api/v1/programmes/${programmeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log(error.response?.data?.message);
  }
}
