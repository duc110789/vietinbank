/* eslint-disable no-shadow */
import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  lockOrUnlockMerchant, getMerchantList,
} from '../../../store/actions/masterMerchant/masterMerchant';

const ModalCommon = (props) => {
  const {
    isOpen, onClickToCloseModal, notifyModal, lockOrUnlockMerchant, codeMerchant,
    lockOrUnlock,
  } = props;

  let data = {};

  const onCLickLockOrUnLockModal = async () => {
    if (lockOrUnlock === 1) {
      data = {
        merchantCode: codeMerchant || 0,
      };
    } else {
      data = {
        merchantCode: codeMerchant || 0,
      };
    }
    await lockOrUnlockMerchant(data);
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
  dataSearchMerchant: state.masterMerchant.dataSearchMerchant,
});

const mapDispatchToProps = (dispatch) => ({
  lockOrUnlockMerchant: (data) => dispatch(lockOrUnlockMerchant(data)),
  getMerchantList: (data) => dispatch(getMerchantList(data)),
});

ModalCommon.propTypes = {
  isOpen: PropTypes.bool,
  codeMerchant: PropTypes.object,
  onClickToCloseModal: PropTypes.func,
  notifyModal: PropTypes.object,
  lockOrUnlockMerchant: PropTypes.func,
  lockOrUnlock: PropTypes.number,
  getMerchantList: PropTypes.func,
  dataSearchMerchant: PropTypes.object,
};

ModalCommon.defaultProps = {
  isOpen: false,
  codeMerchant: null,
  onClickToCloseModal: () => {},
  notifyModal: null,
  lockOrUnlockMerchant: () => {},
  lockOrUnlock: 0,
  dataSearchMerchant: {},
  getMerchantList: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCommon);
