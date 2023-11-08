export default function getRoomsNumberGraph(roomsNumber) {
  let roomsNumberTypes = {
    "0.7": "студия",
    '1.0': "1-комнатная",
    '2.0': "2-комнатная",
    '3.0': "3-комнатная",
    '4.0': "4-комнатная",
    '5.0': "5-комнатная",
    '6.0': "6-комнатная",
  };
  return roomsNumberTypes[roomsNumber];
}
