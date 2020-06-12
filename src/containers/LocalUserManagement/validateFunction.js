export default class Validate {
  static isUserName(username) {
    return (username !== '' && /^([A-Za-z0-9]){4,20}$/.test(
      username.trim(),
    )) !== false;
  }

  static isEmail(email) {
    return !((email !== '' && /^[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
      email.trim(),
    )) === false || (email === ''));
  }

  static phone(phoneNumber) {
    if (phoneNumber === '' || !phoneNumber) {
      return true;
    }
    return !((phoneNumber !== '' && /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s.]?[(]?[0-9]{1,3}[)]?([-\s.]?[0-9]{3})([-\s.]?[0-9]{3,4})/g.test(
      phoneNumber.trim(),
    )) === false || phoneNumber === '');
  }
}
