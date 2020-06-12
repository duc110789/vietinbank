export default class Auth {
  /**
   * Get token
   * @returns {String}
   */
  static getToken() {
    return localStorage.getItem('token_mms');
  }

  static getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  /**
   * Check auth
   * @returns {Bool}
   */
  static isLogin() {
    return this.getToken() !== null;
  }

  /**
   * Check is admin or not
   * @returns {Bool}
   */
  static isAdmin() {
    const user = this.parseJwt();

    return user.is_admin === true;
  }

  /**
   * Paser Jwt to object
   * @returns {Object}
   */
  static parseJwt(token) {
    if (!token) {
      return false;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  }

  /**
   * Log out
   * @returns {Bool}
   */
  static logout() {
    if (localStorage.getItem('email') && localStorage.getItem('token_mms')) {
      localStorage.removeItem('token_mms');
      window.location.href = `${window.app.baseUrl}login`;
    }
  }
}
