export default function getRoomsNumberReversed(roomsNumber) {
  let roomsNumberTypes = {
    0.7: "студия",
    1: "1-комнатная",
    2: "2-комнатная",
    3: "3-комнатная",
    4: "4-комнатная",
    5: "5-комнатная",
    6: "6-комнатная",
  };
  return roomsNumberTypes[roomsNumber];
}
