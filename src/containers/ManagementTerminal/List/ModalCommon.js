/* eslint-disable no-shadow */
import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  lockOrUnlockTerminal,
} from '../../../store/actions/terminal/terminal';

const ModalCommon = (props) => {
  const {
    isOpen, onClickToCloseModal, notifyModal, lockOrUnlockTerminal, idTerminal,
    lockOrUnlock,
  } = props;

  let data = {};

  const onCLickLockOrUnLockModal = async () => {
    if (lockOrUnlock === 1) {
      data = {
        id: idTerminal.id || 0,
        status: idTerminal.status || 0,
      };
    } else {
      data = {
        id: idTerminal.id || 0,
        status: idTerminal.status || 0,
      };
    }
    await lockOrUnlockTerminal(data);
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
});

const mapDispatchToProps = (dispatch) => ({
  lockOrUnlockTerminal: (data) => dispatch(lockOrUnlockTerminal(data)),
});

ModalCommon.propTypes = {
  isOpen: PropTypes.bool,
  idTerminal: PropTypes.object,
  onClickToCloseModal: PropTypes.func,
  notifyModal: PropTypes.object,
  lockOrUnlockTerminal: PropTypes.func,
  lockOrUnlock: PropTypes.number,
};

ModalCommon.defaultProps = {
  isOpen: false,
  idTerminal: null,
  onClickToCloseModal: () => {},
  notifyModal: null,
  lockOrUnlockTerminal: () => {},
  lockOrUnlock: 0,
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalCommon);
