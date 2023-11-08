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
        object_type: getObjectType(buildingInfo?.flatType.toString().toLowerCase()),
        cnt_rooms: getRoomsNumber(buildingInfo?.roomsNumber),
        floor: parseInt(buildingInfo?.floor),
        floors: parseInt(buildingInfo?.floors),
        area: parseFloat(buildingInfo?.square),
        repair: buildingInfo?.repair.toString(),
        has_lift: buildingInfo?.hasLift ? 1 : 0,
        parking_type: getParkingType(buildingInfo?.parkingType.toString()),
        text: buildingInfo.text.toString(),
        //coordinats: !buildingInfo.setCoordinates ? "none" : {x:building.info.coordinates[0],y:building.info.coordinates[1] }
      })
      .then((res) => {
        if (res.status === 200) {
          return res;
        } else {
          throw new Error("ошибка сервера");
        }
      });
  }
}

export default new getPriceService();
