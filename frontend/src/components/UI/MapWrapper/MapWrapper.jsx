import {
  FullscreenControl,
  Map,
  Placemark,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import mark from "../../../../public/imgs/place.svg";
import redMark from "../../../../public/imgs/marks/redMark.svg";
import blueMark from "../../../../public/imgs/marks/blueMark.svg";
import yellowMark from "../../../../public/imgs/marks/yellowMark.svg";
import greenMark from "../../../../public/imgs/marks/greenMark.svg";
import violetMark from "../../../../public/imgs/marks/violetMark.svg";
import purpleMark from "../../../../public/imgs/marks/purpleMark.svg";
import orangeMark from "../../../../public/imgs/marks/orangeMark.svg";
import brownMark from "../../../../public/imgs/marks/brownMark.svg";
import pinkMark from "../../../../public/imgs/marks/pinkMark.svg";
import { useDispatch } from "react-redux";
import { animateScroll as scroll } from "react-scroll";

export default function MapWrapper({
  buildings,
  isMarksLink,
  zoom = 16,
  isDifferentColors = false,
}) {
  let diffirentColorMarks = {
    red: redMark,
    blue: blueMark,
    orange: orangeMark,
    yellow: yellowMark,
    green: greenMark,
    purple: purpleMark,
    violet: violetMark,
    brown: brownMark,
    pink: pinkMark,
  };
  let dispatch = useDispatch();
  let placemarks = buildings.map((building) => {
    if (isDifferentColors)
      return (
        <Placemark
          key={building?.center?.toString() + building.id}
          geometry={building.center}
          options={{
            iconLayout: "default#image",
            iconImageHref: diffirentColorMarks[building?.color],
          }}
        />
      );
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
