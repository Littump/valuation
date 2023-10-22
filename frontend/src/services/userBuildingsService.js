import axios from "axios";
import getParkingType from "../functions/getParkingType";
import getObjectType from "../functions/getObjectType";
import getHouseMaterial from "../functions/getHouseMaterial";
import { URL } from "../config/URL";

class userBuildingsService {
  async getBuildings() {
    return axios.get(`${URL}/api/property/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("auth_token"),
      },
    });
  }
  async deleteBuilding(id) {
    return axios.delete(`${URL}/api/property/${id}`);
  }
  async addBuilding({ buildingInfo, price }) {
    console.log({
      address: buildingInfo?.address.toString(),
      house_material: getHouseMaterial(buildingInfo?.houseType.toString()),
      object_type: getObjectType(buildingInfo?.flatType.toString()),
      cnt_rooms: buildingInfo?.roomsNumber.toString(),
      floor: buildingInfo?.floor.toString(),
      area: buildingInfo?.square.toString(),
      repair: buildingInfo?.repair.toString(),
      has_lift: +buildingInfo?.hasLift,
      parking_type: getParkingType(buildingInfo?.parkingType.toString()),
      text: buildingInfo?.description.toString(),
      price: price,
    });
    return axios.post(
      `${URL}/api/property/`,
      {
        address: buildingInfo?.address.toString(),
        house_material: getHouseMaterial(buildingInfo?.houseType.toString()),
        object_type: getObjectType(buildingInfo?.flatType.toString()),
        cnt_rooms: buildingInfo?.roomsNumber.toString(),
        floor: buildingInfo?.floor.toString(),
        area: buildingInfo?.square.toString(),
        repair: buildingInfo?.repair.toString(),
        has_lift: +buildingInfo?.hasLift,
        parking_type: getParkingType(buildingInfo?.parkingType.toString()),
        text: buildingInfo?.description.toString(),
        price: price,
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
