export default function getParkingTypeReversed(parkingType) {
  let parkingTypes = {
    grn: "наземная парковка",
    mlt: "многоуровневая парковка",
    und: "подземная парковка",
    orf: "парковка на крыше",
    0: "нет парковки",
  };
  return parkingTypes[parkingType];
}
