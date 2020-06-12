import axios from 'axios';
import {baseUrl, messageError} from '../utils';
import Auth from '../middleware/Auth';
import { handleToken } from './handleToken';

/**
 * Fetch api endpoint
 * @param {String} endpoint Endpoint api
 * @param {String} method method in list method http accept
 * @param {Object} params Param to fetch
 * @param {String} accessToken Access token to auth
 * @return {Object} Object response
 */

// eslint-disable-next-line import/prefer-default-export
export async function axiosCallApi(endpoint, method = 'get', params, headerParams = {}) {
  let fullUrl = '';
  const token = Auth.getToken();
  const refreshToken = Auth.getRefreshToken();
  const addTime = 60000;
  let updateAxios = null;

  if (method === 'get' && params && Object.keys(params).length > 0) {
    fullUrl = baseUrl(endpoint, params);
  } else {
    fullUrl = baseUrl(endpoint, {});
  }
  const axiosSetup = {
    url: fullUrl,
    method,
    timeout: 60000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${token}`,
      ...headerParams,
    },
    dataType: 'json',
  };
  if (method === 'get') {
    axiosSetup.params = params;
  } else {
    axiosSetup.data = params;
  }
  if (token && refreshToken) {
    const newToken = await handleToken(token, refreshToken, addTime);
    if (newToken === 'Phiên đăng nhập còn hiệu lực') {
      updateAxios = {
        ...axiosSetup,
      };
    }
    if (newToken === 'Phiên đăng nhập đã hết hạn') {
      window.location.href = '/';
      messageError('Phiên đăng nhập đã hết hạn');
    }
    if (typeof newToken === 'object') {
      updateAxios = {
        ...axiosSetup,
        headers: {
          ...axiosSetup.headers,
          Authorization: `${newToken.token}`,
        },
      };
    }
    try {
      const result = await axios(updateAxios);
      if (result && result.data) {
        switch (result.data.code) {
          case '-1':
            messageError('Quý khách không được cấp quyền truy cập chức năng này');
            break;
          case '-2':
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/#/login';
            break;
          default:
            break;
        }
        return result.data;
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        if (!err.response.data.isSuccess && err.response.data.errorCode === 1003 && err.response.data.detail === 'Not signed in') {
          window.location.href = '/#/logout';
        }
        return err.response.data;
      }
    }
  } else {
    try {
      const result = await axios(axiosSetup);
      if (result && result.data) {
        switch (result.data.code) {
          case '-1':
            messageError('Quý khách không được cấp quyền truy cập chức năng này');
            break;
          case '-2':
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/#/login';
            break;
          default:
            break;
        }
        return result.data;
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        if (!err.response.data.isSuccess && err.response.data.errorCode === 1003 && err.response.data.detail === 'Not signed in') {
          window.location.href = '/#/logout';
        }
        return err.response.data;
      }
    }
  }
  return true;
}
