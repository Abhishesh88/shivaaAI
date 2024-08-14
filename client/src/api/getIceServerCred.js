import axios from "axios";
import { API_URL } from "../constants";

export default async function getIceServerCred() {
  // const { data } = await axios.get(`/get_credentials`);
  const { data } = await axios.get(`${API_URL}/api/v1/ice_server/get_credentials`);
  return data;
}
