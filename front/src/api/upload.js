import axios from "axios";

export async function upload(applicationId,input, token) {
  try {
    const formdata = new FormData()
    formdata.append("photo",input.photo[0])
    formdata.append("signature",input.signature[0])
    formdata.append("hscMarksheet",input.hscMarksheet[0])
    await axios.post(`/api/v1/uploads/${applicationId}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}