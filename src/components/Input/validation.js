import React from 'react';
import {
  checkContainOnlyWhiteSpace,
  checkImageFormat,
  checkLengthString,
  checkValidEmail,
  formatPhoneNumber,
  isAllowNumberFormat,
  isCharacterFormat,
  isContainSpecialCharacters,
  isEmpty,
  isNumberAndChar,
  formatFullName,
  formatStaffCode,
} from '../../utils/validation';
import validateField from './constants';
import Validate from '../../containers/LocalUserManagement/validateFunction';

export const checkNumberFormat = (value, inputType) => {
  if (formatPhoneNumber(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isNumber}
      </small>
    );
  }
  return false;
};

export const isInvalidNumberPhone = (value, inputType) => {
  if (!Validate.phone(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.checkEmailFormat}
      </small>
    );
  }
  return false;
};

export const checkPasswordFormat = (value, inputType) => {
  if (!isNumberAndChar(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.numberAndCharRequired}
      </small>
    );
  }
  return false;
};

export const checkWhiteSpaceOnly = (value, inputType) => {
  if (checkContainOnlyWhiteSpace(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        must not only contain whitespace.
      </small>
    );
  }
  return false;
};

export const checkRequiredInput = (value, inputType) => {
  if (isEmpty(value)) {
    return (
      <small className="form-text text-danger">
        {validateField.isRequiredInput}
        {' '}
        {inputType.label}
      </small>
    );
  }
  return false;
};

export const checkRequiredInputSpecial = (value, label) => {
  if (isEmpty(value)) {
    return (
      <small className="form-text text-danger">
        {validateField.isRequiredInput}
        {' '}
        {label}
      </small>
    );
  }
  return false;
};

export const checkRequiredSelect = (value, label) => {
  if (isEmpty(value)) {
    return (
      <small className="form-text text-danger">
        {validateField.isRequiredSelect}
        {' '}
        {label}
      </small>
    );
  }
  return false;
};

export const checkRequiredSelectInput = (value, label) => {
  if (isEmpty(value)) {
    return (
      <small className="form-text text-danger">
        {validateField.isRequiredInput}
        {' '}
        {label}
      </small>
    );
  }
  return false;
};

export const checkValid = (value, inputType) => {
  if (isEmpty(value)) {
    return (
      <small className="form-text text-danger">
        {validateField.isValid}
        {inputType.label}
      </small>
    );
  }
  return false;
};

export const checkStaffCode = (value, inputType) => {
  if (!formatStaffCode(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {validateField.isCode}
      </small>
    );
  }
  return false;
};

export const checkEmailFormat = (value, inputType) => {
  if (!checkValidEmail(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {validateField.checkEmailFormat}
      </small>
    );
  }
  return false;
};

export const isUserName = (value, inputType) => {
  if (!Validate.isUserName(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {validateField.checkEmailFormat}
      </small>
    );
  }
  return false;
};

export const isFullName = (value, inputType) => {
  if (value && !formatFullName(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isValidField}
      </small>
    );
  }
  return false;
};

export const checkCharacterFormat = (value, inputType) => {
  if (isCharacterFormat(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.checkCharacerFormat}
      </small>
    );
  }
  return false;
};

export const checkPhoneNumber = (value, inputType) => {
  if (value && !formatPhoneNumber(value)) {
    return (
      <small className="form-text text-danger">
        {validateField.checkPhoneNumber}
      </small>
    );
  }
  return false;
};

export const checkUnique = (value, inputType) => {
  if (value && typeof inputType.unique !== 'undefined' && !inputType.unique) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {validateField.checkUnique}
      </small>
    );
  }
  return false;
};

export const checkContainSpace = (value, inputType) => {
  if (value && value.indexOf(' ') >= 0) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.checkContainSpace}
      </small>
    );
  }
  return false;
};

export const checkContainSpecialCharacters = (value, inputType) => {
  if (value && isContainSpecialCharacters(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.containSpecialCharacters}
      </small>
    );
  }
  return false;
};

export const isValidVietnamese = (value, inputType) => {
  // eslint-disable-next-line no-control-regex
  const re = /[^\x00-\x7F]/;
  if (re.test(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.notVietnamese}
      </small>
    );
  }
  return false;
};

export const checkFormatImage = (value, inputType) => {
  if (value && !checkImageFormat(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.formatImage}
      </small>
    );
  }
  return false;
};

export const notAllowInputNumber = (value, inputType) => {
  if (value && isAllowNumberFormat(value)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.notFormatNumber}
      </small>
    );
  }
  return false;
};

export const checkLength8 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 8)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength8}
      </small>
    );
  }
  return false;
};

export const checkLength28 = (value, inputType) => {
  if (value && !checkLengthString(value, 2, 8)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength28}
      </small>
    );
  }
  return false;
};

export const checkLength10 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 10)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength10}
      </small>
    );
  }
  return false;
};

export const checkLength13 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 13)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength13}
      </small>
    );
  }
  return false;
};

export const checkLength19 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 19)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength19}
      </small>
    );
  }
  return false;
};

export const checkLength20 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 20)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength20}
      </small>
    );
  }
  return false;
};

export const checkLength25 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 25)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength25}
      </small>
    );
  }
  return false;
};

export const checkLength30 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 30)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength30}
      </small>
    );
  }
  return false;
};

export const checkLength50 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 50)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength50}
      </small>
    );
  }
  return false;
};

export const checkLength4To50 = (value, inputType) => {
  if (value && !checkLengthString(value, 4, 50)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength450}
      </small>
    );
  }
  return false;
};

export const checkLength3To14 = (value, inputType) => {
  if (value && !checkLengthString(value, 3, 14)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength314}
      </small>
    );
  }
  return false;
};

export const checkLength10To13 = (value, inputType) => {
  if (value && !checkLengthString(value, 10, 13)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength1013}
      </small>
    );
  }
  return false;
};

export const checkLength3To150 = (value, inputType) => {
  if (value && !checkLengthString(value, 3, 150)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength3150}
      </small>
    );
  }
  return false;
};

export const checkLength3To50 = (value, inputType) => {
  if (value && !checkLengthString(value, 3, 50)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength350}
      </small>
    );
  }
  return false;
};

export const checkLength6To50 = (value, inputType) => {
  if (value && !checkLengthString(value, 6, 50)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength650}
      </small>
    );
  }
  return false;
};

export const checkLength6To150 = (value, inputType) => {
  if (value && !checkLengthString(value, 6, 150)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength6150}
      </small>
    );
  }
  return false;
};

export const checkLength10To150 = (value, inputType) => {
  if (value && !checkLengthString(value, 10, 150)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength10150}
      </small>
    );
  }
  return false;
};

export const checkLength6To20 = (value, inputType) => {
  if (value && !checkLengthString(value, 6, 20)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength620}
      </small>
    );
  }
  return false;
};

export const checkLength6To80 = (value, inputType) => {
  if (value && !checkLengthString(value, 6, 80)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength680}
      </small>
    );
  }
  return false;
};

export const checkLength100 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 100)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength100}
      </small>
    );
  }
  return false;
};

export const checkLength150 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 150)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength150}
      </small>
    );
  }
  return false;
};

export const checkLength200 = (value, inputType) => {
  if (value && !checkLengthString(value, 0, 200)) {
    return (
      <small className="form-text text-danger">
        {inputType.label}
        {' '}
        {validateField.isLength200}
      </small>
    );
  }
  return false;
};
