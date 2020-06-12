import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import PropTypes from 'prop-types';

const ModalCommon = (props) => {
  const {
    isOpen, onClickToCloseModal, notifyModal, data, clickToButtonInMoDal,
  } = props;
  const onCLickLockModal = async () => {
    await clickToButtonInMoDal(data);
  };
  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader>{notifyModal.title}</ModalHeader>
        <ModalBody className="text-center">
          {notifyModal.content}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onCLickLockModal}>{notifyModal.button}</Button>
          <Button color="secondary" onClick={onClickToCloseModal}>Bỏ qua</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ModalCommon.propTypes = {
  isOpen: PropTypes.bool,
  onClickToCloseModal: PropTypes.func,
  notifyModal: PropTypes.object,
  data: PropTypes.any,
  clickToButtonInMoDal: PropTypes.func,
};

ModalCommon.defaultProps = {
  isOpen: false,
  onClickToCloseModal: () => {},
  notifyModal: null,
  data: null,
  clickToButtonInMoDal: () => {},
};

export default ModalCommon;
