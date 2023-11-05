export default function getParkingTypeReversed(parkingType) {
  let parkingTypes = {
    grn: "наземная парковка",
    mlt: "многоуровневая парковка",
    und: "подземная парковка",
    orf: "парковка на крыше",
    none: "нет парковки",
  };
  return parkingTypes[parkingType];
}
