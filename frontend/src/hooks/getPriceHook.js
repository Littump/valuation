import { useMutation } from "react-query";
import getPriceService from "../services/getPriceService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getHouseMaterialReversed from "../functions/getHouseMaterialReversed";
import getObjectTypeReversed from "../functions/getObjectTypeReversed";
import getRepairName from "../functions/getRepairName";
import getParkingTypeReversed from "../functions/getParkingTypeReversed";

export const getPriceHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (buildingInfo) => {
      return getPriceService.getPrice(buildingInfo);
    },
    onSuccess: (data) => {
      dispatch({
        type: "analysis/setCost",
        cost: Math.round(data?.data?.price) / 1000000,
      });
      dispatch({
        type: "analysis/setBuildingInfoResponse",
        buildingInfoResponse: data.data.house_info,
      });
      dispatch({
        type: "analysis/setInfrastructure",
        infrastructure: data.data.infrastructure,
      });
      dispatch({
        type: "analysis/setHouseCoordinates",
        coordinates: [data.data.latitude, data.data.longitude],
      });
      let similarObjects = data.data.similar_objects;
      let id = 1;
      dispatch({
        type: "similarBuildings/deleteObjects",
      });
      similarObjects.forEach((buildingInfo) => {
        let objectInfo = {
          house_material: getHouseMaterialReversed(buildingInfo.house_material),
          object_type: getObjectTypeReversed(buildingInfo.object_type),
          repair: getRepairName(buildingInfo.repair[0], buildingInfo.repair[2]),
          has_lift: !!buildingInfo.has_lift,
          parking_type: getParkingTypeReversed(buildingInfo.parking_type),
          address: buildingInfo.address,
          floor: buildingInfo.floor,
          cnt_rooms: buildingInfo.cnt_rooms,
          floors: buildingInfo.floors,
          area: buildingInfo.area,
          coordinates: [buildingInfo.latitude, buildingInfo.longitude], //todo
          isOpen: false,
          price: (buildingInfo.price / 1000000).toFixed(1), //todo
          id: buildingInfo.id, //todo
          local_id: id,
        };
        id++;

        dispatch({
          type: "similarBuildings/setObject",
          object: objectInfo,
        });
      });

      navigate("/analysis");
    },
    onError: () => {
      alert("Ошибка на сервере, попробуйте ещё раз:)");
    },
  });
};
