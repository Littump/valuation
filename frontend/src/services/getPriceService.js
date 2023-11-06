import axios from "axios";
import getParkingType from "../functions/getParkingType";
import getHouseMaterial from "../functions/getHouseMaterial";
import getObjectType from "../functions/getObjectType";
import { URL } from "../config/URL";
import getRoomsNumber from "../functions/getRoomsNumber";

class getPriceService {
  async getPrice(buildingInfo) {
    return axios
      .post(`${URL}/api/property/get_price/`, {
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
      })
      .then((res) => {
        if (res.ok) {
          return res;
        }
        throw new Error("нет ответа с сервера");
      });
  }
}

export default new getPriceService();
