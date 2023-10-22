import axios from "axios";
import { URL } from "../config/URL";

class loginService {
  async login(values) {
    return axios.post(`${URL}/api/auth/token/login/`, {
      password: values.password,
      username: values.username,
    });
  }
}

export default new loginService();
