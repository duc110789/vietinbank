/* eslint-disable no-shadow */
import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getQrCodeList, lockOrUnlockQrCode,
} from '../../../store/actions/qRCode/qRCode';


const ModalCommon = (props) => {
  const {
    isOpen, onClickToCloseModal, notifyModal, lockOrUnlockQrCode, qrcodeId,
    lockOrUnlock,
  } = props;


  let data = {};

  const onCLickLockOrUnLockModal = async () => {
    if (lockOrUnlock === 1) {
      data = {
        qrcodeId: qrcodeId || 0,
      };
    } else {
      data = {
        qrcodeId: qrcodeId || 0,
      };
    }
    await lockOrUnlockQrCode(data);
    onClickToCloseModal();
  };
  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader>{notifyModal.title}</ModalHeader>
        <ModalBody>
          {notifyModal.content}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClickToCloseModal}>Hủy bỏ</Button>
          <Button color="primary" onClick={onCLickLockOrUnLockModal}>{notifyModal.button}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  dataSearchQrCode: state.qRCode.dataSearchQrCode,
});

const mapDispatchToProps = (dispatch) => ({
  lockOrUnlockQrCode: (data) => dispatch(lockOrUnlockQrCode(data)),
  getQrCodeList: (data) => dispatch(getQrCodeList(data)),
});

ModalCommon.propTypes = {
  isOpen: PropTypes.bool,
  qrcodeId: PropTypes.object,
  onClickToCloseModal: PropTypes.func,
  notifyModal: PropTypes.object,
  lockOrUnlockQrCode: PropTypes.func,
  lockOrUnlock: PropTypes.number,
};

ModalCommon.defaultProps = {
  isOpen: false,
  qrcodeId: null,
  onClickToCloseModal: () => {},
  notifyModal: null,
  lockOrUnlockQrCode: () => {},
  lockOrUnlock: 0,
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCommon);
