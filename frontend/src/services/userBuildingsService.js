import axios from "axios";
import getParkingType from "../functions/getParkingType";
import getObjectType from "../functions/getObjectType";
import getHouseMaterial from "../functions/getHouseMaterial";
import { URL } from "../config/URL";
import getRoomsNumber from "../functions/getRoomsNumber";

class userBuildingsService {
  async getBuildings() {
    return axios.get(`${URL}/api/property?author=1`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("auth_token"),
      },
    });
  }
  async deleteBuilding(id) {
    return axios.delete(`${URL}/api/property/${id}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("auth_token"),
      },
    });
  }
  async addBuilding({ buildingInfo, price }) {
    return axios.post(
      `${URL}/api/property/`,
      {
        address: buildingInfo?.address.toString(),
        house_material: getHouseMaterial(buildingInfo?.houseType.toString()),
        object_type: getObjectType(buildingInfo?.flatType.toString()),
        cnt_rooms: getRoomsNumber(buildingInfo?.roomsNumber),
        floor: parseInt(buildingInfo?.floor),
        floors: parseInt(buildingInfo?.floors),
        area: parseFloat(buildingInfo?.square),
        repair: buildingInfo?.repair.toString(),
        has_lift: buildingInfo?.hasLift ? 1 : 0,
        parking_type: getParkingType(buildingInfo?.parkingType.toString()),
        text: buildingInfo.text.toString(),
        price_buy: price * 1000000,
      },
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("auth_token"),
        },
      }
    );
  }
}

export default new userBuildingsService();
