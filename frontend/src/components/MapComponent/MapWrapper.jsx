import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import mark from "../../../public/imgs/place.svg";

export default function MapWrapper({positions}) {
    let placemarks = positions.map(center =>(
        <Placemark geometry={center} key={center[0].toString() + center[1].toString()} options={{
            iconLayout:'default#image',
            iconImageHref:mark
        }}/>
    ))
    return (
        <YMaps  >
            <Map state={{center: positions[0], zoom: 16}} width={'100%'} height={'100%'}>
                {placemarks}
            </Map>
        </YMaps>

    )
}