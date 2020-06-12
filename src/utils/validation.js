import Validate from '../containers/LocalUserManagement/validateFunction';

export const checkContainOnlyWhiteSpace = (value) => {
  if (!value || value.toString() === '') {
    return false;
  }

  return !value.replace(/\s/gu, '').length;
};

export const isEmpty = (value) => {
  return !value || value.toString().trim().length === 0;
};

export const checkValidURL = (value) => /^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(value)
          || /^(https?:\/\/)?((w{3}\.)?)twitter.com\/.*/i.test(value)
          || /^(https?:\/\/)?((w{3}\.)?)instagram.com\/.*/i.test(value)
          || /^(https?:\/\/)?((w{3}\.)?)linkedin.com\/.*/i.test(value);

export const checkValidEmail = (value) => {
  if (value && value.length > 0) {
    return Validate.isEmail(value)
      && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
        .test(value) && (value.indexOf(' ') === -1);
  }
  return true;
};

export const checkImageFormat = (value) => /\.(jpg|jpeg|png)$/i.test(value);

export const checkValidHTTPLink = value => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gu.test(value); //eslint-disable-line

export const checkLengthString = (value, min = -1, max = -1) => {
  if (min === 0 && max > 0) {
    if (value) { return ((value.length >= min) && (value.length <= max)); }
    return true;
  }
  if (min >= 0 && max >= 0) {
    return ((value.length >= min) && (value.length <= max));
  }
  if (min >= 0 && max < 0) {
    return (value.length >= min);
  }
  if (min < 0 && max >= 0) {
    return (value.length <= max);
  }
  return false;
};

export const isContainSpecialCharacters = (value) => {
  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  for (let count = 0; count < specialChars.length; count += 1) {
    if (value.indexOf(specialChars[count]) > -1) {
      return true;
    }
  }
  return false;
};

export const isValidNumberFormat = (value) => /^-?\d+(?:[.]\d*?)?$/.test(value);

export const isAllowNumberFormat = (value) => /\d/.test(value);

export const isCharacterFormat = (value) => /^(?=.*[a-z0-9])[a-z0-9!@#$%&*.]{7,}$/.test(value);

export const isNumberAndChar = (value) => /(?:\d+[a-zA-Z]|[a-zA-Z]+\d)[a-zA-Z\d]*/.test(value);

export const formatPhoneNumber = (phoneNumberString) => {
  const match = phoneNumberString.match(/((\+84)|0)([0-9]{9})$/);
  return !!match;
};

export const formatFullName = (fullName) => {
  return !((fullName !== '' && /^[A-Za-z0-9\\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ\s]{6,80}$/.test(
    fullName && fullName.trim(),
  )) === false || (fullName === ''));
};

export const formatStaffCode = (code) => {
  return !((code !== '' && /^[0-9a-zA-Z]{6,20}$/.test(
    code.trim(),
  )) === false || (code === ''));
};

export const removeAscent = (str) => {
  if (str === null || str === undefined) return str;

  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
  str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
  str = str.replace(/[ÌÍỊỈĨ]/g, 'I');
  str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
  str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
  str = str.replace(/[ỲÝỴỶỸ]/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str;
};
