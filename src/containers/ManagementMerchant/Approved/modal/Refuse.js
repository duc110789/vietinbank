/* eslint-disable no-shadow */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {deniedMerchant} from '../../../../store/actions/masterMerchant/masterMerchant';
import {getDescription} from '../../../../utils/commonFunction';
import {messageError} from "../../../../utils";

const Refuse = (props) => {
  const {
    toggleModalDenied,
    isShowModalDenied,
    arrDeniedDesc,
    deniedMerchant,
    merchantApproved,
  } = props;

  const [infoCodeDenied, setInfoCodeDenied] = useState(1);
  const [noteDenied, setNoteDenied] = useState(0);
  const toggle = () => toggleModalDenied();
  const deniedFeeMerchant = async () => {
    const descriptionDenied = getDescription(arrDeniedDesc, infoCodeDenied);
    try {
      const data = {
        merchantCode: merchantApproved.merchant.merchantCode,
        processUser: 'string',
        processAddition: noteDenied,
        status: 5,
        idDenied: infoCodeDenied,
        descDenied: descriptionDenied,
        createUserEmail: merchantApproved.terminalContact.email,
      };
      await deniedMerchant(data);
      toggle();
      // history.goBack();
    } catch (e) {
      messageError('Có lỗi trong quá trình xét duyệt!');
    }
  };

  const handleChangeCodeDenied = (event) => {
    setInfoCodeDenied(parseInt(event.target.value, 10));
  };

  const handleChangeDescription = (event) => {
    setNoteDenied(event.target.value);
  };

  return (
    <div>
      <Modal isOpen={isShowModalDenied} centered toggle={toggle}>
        <ModalHeader toggle={toggle}><div className="text-center">Lý do từ chối Merchant</div></ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col md={12}>
              <h6>
                <b>Loại lý do:</b>
              </h6>
              <>
                {
                  arrDeniedDesc.map((item) => (
                    <FormGroup check key={item.code}>
                      <Label key={item.key}>
                        <Input
                          type="radio"
                          name="radio-denied"
                          onChange={handleChangeCodeDenied}
                          style={{ margin: '5px 0 0 -1.25rem' }}
                          value={item.code}
                          defaultChecked={item.code === '1'}
                        />
                        {item.description}
                      </Label>
                    </FormGroup>
                  ))
                }
              </>
              <h6>
                <b>Nội dung ghi chú gửi tới khách hàng</b>
              </h6>
              <textarea placeholder="" maxLength={150} className="form-control" style={{ height: '90px' }} onChange={handleChangeDescription} />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            <i className="fa fa-close" />
            Bỏ Qua
          </Button>
          {' '}
          <Button color="primary" onClick={deniedFeeMerchant}>
            <i className="fa fa-check" />
            Gửi Đi
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

Refuse.propTypes = {
  isShowModalDenied: PropTypes.bool.isRequired,
  toggleModalDenied: PropTypes.func,
  itemApprove: PropTypes.string,
  arrDeniedDesc: PropTypes.array,
  saveApproveFeeBank: PropTypes.func,
  history: PropTypes.object,
};

Refuse.defaultProps = {
  toggleModalDenied: () => {},
  itemApprove: '0',
  arrDeniedDesc: [],
  saveApproveFeeBank: () => {},
  history: {},
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
  deniedMerchant: (data) => dispatch(deniedMerchant(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Refuse));
