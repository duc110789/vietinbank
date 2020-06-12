import { getAllMenu, getAllStatusByType, getAllUser } from './systemManager';

export async function setItemCommon(item) {
  const itemCommon = await getAllStatusByType({
    type: item,
  });
  if (localStorage.getItem(item) === null) {
    if (itemCommon.data !== undefined) {
      localStorage.setItem(item, JSON.stringify(itemCommon.data));
    }
  }
}

export async function setItemCommonUser(item) {
  const itemCommonUser = await getAllUser({
    type: item,
  });
  if (localStorage.getItem(item) === null) {
    if (itemCommonUser.data !== undefined) {
      localStorage.setItem(item, JSON.stringify(itemCommonUser.data));
    }
  }
}

export async function setItemCommonLevelMenu(item) {
  const itemCommonLevelRoleMidTid = await getAllMenu({
    type: item,
  });
  // if (localStorage.getItem(item) === null) {
  //   if (itemCommonLevelRoleMidTid.data !== undefined) {
  localStorage.setItem(item, JSON.stringify(itemCommonLevelRoleMidTid.data));
  //   }
  // }
}


export function callApiCommon() {
  setItemCommon('MERCHANT');
  setItemCommon('TERMINAL');
  setItemCommon('TRANSACTION');
  setItemCommon('REFUND');
  setItemCommon('REFUNDTYPE');
  setItemCommon('DENIED_APPROVE');
  setItemCommon('TERMINAL_MCS');
  setItemCommon('SMSTYPE');
  setItemCommon('MERCHANT_ORDER');
  setItemCommon('CHANNEL_REFUND');
  setItemCommon('TYPE_SOURCE');
  setItemCommon('QR_CHANNEL');
  setItemCommon('REFUND_STATUS');
  setItemCommon('COLLATE_STATUS');
  setItemCommonUser('LIST_ALL_USER');
  setItemCommonLevelMenu('ROLE_MID_TID');
  setItemCommon('MERCHANT_USER');
  setItemCommon('QRCODE');
}
