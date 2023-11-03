import axios from "axios";
import { URL } from "../config/URL";
import getObjectType from "../functions/getObjectType";
import getHouseMaterial from "../functions/getHouseMaterial";
import getRepairTypeForFullString from "../functions/getRepairTypeForFullString";

class graphsService {
  async getGraphData({ values, type }) {
    return axios.get(
      `${URL}/api/property/?author=${type ? "1" : ""}${
        values.region === "Любой" ? "" : "&address=" + values.region
      }${
        values.houseMaterial === "Любой"
          ? ""
          : "&house_material=" + getHouseMaterial(values.houseMaterial)
      }${
        values.houseType === "Любой"
          ? ""
          : "&object_type=" + getObjectType(values.houseType)
      }${
        values.repairType === "Любой"
          ? ""
          : "&repair=" + getRepairTypeForFullString(values.repairType)
      }${
        values.metroName === "" ? "" : "&metro_name=" + values.metroName
      }&floor=${values.floor.min + "," + values.floor.max}&price=${
        values.price.min + "," + values.price.max
      }&cnt_rooms=${
        values.roomsNumber.min + "," + values.roomsNumber.max
      }&floors=${values.floors.min + "," + values.floors.max}&area=${
        values.area.min + "," + values.area.max
      }&house_year=${values.date.min + "," + values.date.max}&metro_min=${
        values.metroMin.min + "," + values.metroMin.max
      }
      `,
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("auth_token"),
        },
      }
    );
  }
}

export default new graphsService();
