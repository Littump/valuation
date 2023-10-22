export default function getObjectType(objectType) {
  if (objectType === "") return "";
  let objectTypes = {
    первичка: "1",
    вторичка: "2",
  };
  return objectTypes[objectType];
}
