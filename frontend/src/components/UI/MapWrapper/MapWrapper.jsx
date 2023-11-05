import {
  FullscreenControl,
  Map,
  Placemark,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import mark from "../../../../public/imgs/place.svg";
import { useDispatch } from "react-redux";
import { animateScroll as scroll } from "react-scroll";

export default function MapWrapper({ buildings, isMarksLink, zoom = 16 }) {
  let dispatch = useDispatch();
  let placemarks = buildings.map((building) => {
    return (
      <Placemark
        key={building?.center?.toString() + building.id}
        geometry={building.center}
        options={{
          iconLayout: "default#image",
          iconImageHref: mark,
        }}
        onClick={() => {
          if (isMarksLink) {
            scroll.scrollTo(500 + building.local_id * 120);
            dispatch({ type: "similarBuildings/goToObject", id: building.id });
          }
        }}
      />
    );
  });
  return (
    <Map
      state={{ center: buildings[0].center, zoom: zoom }}
      width={"100%"}
      height={"100%"}
    >
      {placemarks}
      <FullscreenControl />
      <ZoomControl options={{ float: "right" }} />
    </Map>
  );
}
