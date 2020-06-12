import axios from 'axios';
import Auth from '../middleware/Auth';
import {messageError} from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const handleToken = async (token, refreshToken, addTime) => {
  const decodeToken = Auth.parseJwt(token);
  const decodeRefreshToken = Auth.parseJwt(refreshToken);
  let responseToken = null;
  return new Promise((resolve, reject) => {
    let isValid = false;
    // eslint-disable-next-line max-len
    if ((new Date(decodeToken.exp * 1000).getTime()) < (new Date().getTime() + addTime)) {
      if (new Date().getTime() < new Date(decodeRefreshToken.exp * 1000).getTime()) {
        isValid = true;
      } else {
        localStorage.clear();
        sessionStorage.clear();
        resolve(('Phiên đăng nhập đã hết hạn'));
        messageError('Phiên đăng nhập đã hết hạn');
        this.props.history.push('/login');
      }
      if (isValid) {
        axios.post('http://10.22.7.120:9003/mms/auth/refreshToken', {
          refreshToken,
        })
          .then((response) => {
            localStorage.removeItem('token_mms');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('token_mms', response.data.data.token);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
            const decodeTokenNew = Auth.parseJwt(response.data.data.token);
            localStorage.setItem('username', decodeTokenNew.Username);
            localStorage.setItem('lastLogin', decodeTokenNew.LastTimeLogin);
            responseToken = {
              token: response.data.data.token,
              refreshToken: response.data.data.refreshToken,
            };
            resolve(responseToken);
          })
          .catch((error) => {
            reject(error);
          });
      }
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      // reject(new Error('Phiên đăng nhập còn hiệu lực'));
      resolve('Phiên đăng nhập còn hiệu lực');
    }
  });
};
