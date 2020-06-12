/* eslint-disable no-shadow */
import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getMidTidList, lockOrUnlockMidTid,
} from '../../../store/actions/mIdTid/mIdTid';

const ModalCommon = (props) => {
  const {
    isOpen, onClickToCloseModal, notifyModal, lockOrUnlockMidTid, userId,
    lockOrUnlock, isOtherAction,
  } = props;

  let data = {};

  const onCLickLockOrUnLockModal = async () => {
    if (lockOrUnlock === 1) {
      data = {
        userId: userId || 0,
      };
    } else {
      data = {
        userId: userId || 0,
      };
    }
    await lockOrUnlockMidTid(data);
    onClickToCloseModal();
  };

  const clickOtherAction = () => {
    const { otherAction } = props;
    otherAction();
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
          <Button color="primary" onClick={isOtherAction ? clickOtherAction : onCLickLockOrUnLockModal}>{notifyModal.button}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  dataSearchQrCode: state.qRCode.dataSearchQrCode,
});

const mapDispatchToProps = (dispatch) => ({
  lockOrUnlockMidTid: (data) => dispatch(lockOrUnlockMidTid(data)),
  getMidTidList: (data) => dispatch(getMidTidList(data)),
});

ModalCommon.propTypes = {
  isOpen: PropTypes.bool,
  userId: PropTypes.object,
  onClickToCloseModal: PropTypes.func,
  notifyModal: PropTypes.object,
  lockOrUnlockMidTid: PropTypes.func,
  lockOrUnlock: PropTypes.number,
  isOtherAction: PropTypes.bool,
  otherAction: PropTypes.func,
};

ModalCommon.defaultProps = {
  isOpen: false,
  userId: null,
  onClickToCloseModal: () => {},
  notifyModal: null,
  lockOrUnlockMidTid: () => {},
  lockOrUnlock: 0,
  isOtherAction: false,
  otherAction: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCommon);
