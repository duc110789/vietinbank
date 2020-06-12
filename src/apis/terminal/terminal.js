import { axiosCallApi } from '../index';
import CONFIG_API from '../configEndPoint';

export const addTerminal = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/mms_terninalcreate`, 'post', params);
export const getCacheTerminal = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/getCacheTerminal`, 'post', params);
export const getTerminalList = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/getListTerminal`, 'post', params);
export const getTerminalListDenied = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/getListTerminalDenied`, 'post', params);
export const getTerminalDetail = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/getTerminalDetail`, 'post', params);
export const getTerminalDetailDenied = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/getTerminaDeniedlDetail`, 'post', params);
export const editTerminal = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/mms_terninalupdate`, 'post', params);
export const acceptTerminalKT = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/acceptTerminalKT`, 'post', params);
export const deniedTerminal = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/deniedTerminal`, 'post', params);
export const getLockOrUnlock = (params) => axiosCallApi(`${CONFIG_API.TERMINAL_REACT_APP_BACKEND_HOST}mms/terminal/changeStatusTerminal`, 'post', params);
