export function setLocalStorageSystemCommon(itemCommon) {
  // if (itemCommon !== undefined || itemCommon !== null) {
  //   if (localStorage.getItem(itemCommon.name) === null) {
  localStorage.setItem(itemCommon.name, JSON.stringify(itemCommon.data));
  //   }
  // }
}
