import axios from "axios";
import { URL } from "../config/URL";

class getRenovationTypeService {
  async getRenovationType(images) {
    const imagesData = new FormData();
    images.forEach((element) => {
      imagesData.append("photos", element, element.path);
    });

    return axios.post(`${URL}/api/property/calculate_repair/`, imagesData);
  }
}

export default new getRenovationTypeService();
