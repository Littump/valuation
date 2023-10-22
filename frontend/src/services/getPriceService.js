import axios from "axios";
import getParkingType from "../functions/getParkingType";
import getHouseMaterial from "../functions/getHouseMaterial";
import getObjectType from "../functions/getObjectType";
import { URL } from "../config/URL";

class getPriceService {
  async getPrice(buildingInfo) {
    return axios.post(`${URL}/api/property/get_price/`, {
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
    });
  }
}

export default new getPriceService();
