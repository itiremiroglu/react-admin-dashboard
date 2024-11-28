import { user } from "../../../constants/endpoints";
import http from "../../../utils/http";

const getUserDetails = () => {
    const ENDPOINT = user.getUserDetails();
  
    const API_URL = import.meta.env.VITE_API_URL; // for Vite
  
    return http.get(`${API_URL}${ENDPOINT}`);
  };
  
  export default getUserDetails;
