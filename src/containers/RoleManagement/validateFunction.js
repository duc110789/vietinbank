export default class Validate {
  static isFullName(fullName) {
    if (
      (fullName !== '' && /^[A-Za-z0-9\\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ\s]{6,80}$/.test(
        fullName && fullName.trim(),
      )) === false || (fullName === '')

    ) {
      return false;
    }
    return true;
  }

  static isDescription(description) {
    if (
      (description !== '' && /^[A-Za-z0-9\\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ\s]{10,150}$/.test(
        description && description.trim(),
      )) === false

    ) {
      return false;
    }
    return true;
  }

  static isEmail(email) {
    if (
      // eslint-disable-next-line no-useless-escape
      (email !== '' && /^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
        email.trim(),
      )) === false || (email === '')

    ) {
      return false;
    }
    return true;
  }
}
