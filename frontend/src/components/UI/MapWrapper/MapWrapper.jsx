import {
  FullscreenControl,
  Map,
  Placemark,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import mark from "../../../../public/imgs/place.svg";
import { useDispatch } from "react-redux";
import { scroller } from "react-scroll";

export default function MapWrapper({ buildings, isMarksLink }) {
  let dispatch = useDispatch();
  let placemarks = buildings.map((building) => {
    return (
      <Placemark
        geometry={building.center}
        options={{
          iconLayout: "default#image",
          iconImageHref: mark,
        }}
        onClick={() => {
          if (isMarksLink) {
            scroller.scrollTo("similarObject" + (building.id - 1), {
              smooth: true,
              offset: -100,
            });
            dispatch({ type: "similarBuildings/goToObject", id: building.id });
          }
        }}
      />
    );
  });
  return (
    <Map
      state={{ center: buildings[0].center, zoom: 16 }}
      width={"100%"}
      height={"100%"}
    >
      {placemarks}
      <FullscreenControl />
      <ZoomControl options={{ float: "right" }} />
    </Map>
  );
}
