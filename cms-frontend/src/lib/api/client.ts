import axios from "axios";

const API = "/api/v1/cms";

export const getAllClients = async () => {
  const res = await axios.get(`${API}/list`, {
    headers: { Authorization: `Bearer ${localStorage.token}` },
  });
  return res.data;
};

export const searchClients = async (keyword: string) => {
  const res = await axios.get(`${API}/search?keyword=${keyword}`, {
    headers: { Authorization: `Bearer ${localStorage.token}` },
  });
  return res.data;
};

export const deleteClient = async (id: string) => {
  const res = await axios.delete(`${API}/delete/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.token}` },
  });
  return res.data;
};

// Define the type for client creation data
export interface ClientCreateData {
  name: string;
  email: string;
  // Add other fields as needed
}

export const createClient = async (data: ClientCreateData) => {
  const res = await axios.post(`${API}/create`, data, {
    headers: { Authorization: `Bearer ${localStorage.token}` },
  });
  return res.data;
};
