import axios from "axios";
import { URL } from "../config/URL";
import getObjectType from "../functions/getObjectType";
import getHouseMaterial from "../functions/getHouseMaterial";
import getRepairTypeForFullString from "../functions/getRepairTypeForFullString";

class graphsService {
  async getGraphData({ values, type }) {
    console.log(`${URL}/api/property/?author=${type ? "1" : ""}${
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
    }&floor=${values.floor.join()}&price=${values.price.join()}&cnt_rooms=${values.roomsNumber.join()}&floors=${values.floors.join()}&area=${values.area.join()}&house_year=${values.date.join()}&metro_min=${values.metroMin.join()}
    `);
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
      }&floor=${values.floor.join()}&price=${values.price.join()}&cnt_rooms=${values.roomsNumber.join()}&floors=${values.floors.join()}&area=${values.area.join()}&house_year=${values.date.join()}&metro_min=${values.metroMin.join()}
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
