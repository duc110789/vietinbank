/* eslint-disable no-shadow */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getDescription} from '../../../../utils/commonFunction';
import {deniedTerminal} from '../../../../store/actions/terminal/terminal';
import {messageError} from "../../../../utils";

const Refuse = (props) => {
  const {
    toggleModalDenied,
    isShowModalDenied,
    arrDeniedDesc,
    deniedTerminal,
    terminalDetail,
  } = props;

  const [infoCodeDenied, setInfoCodeDenied] = useState(1);
  const [noteDenied, setNoteDenied] = useState(0);
  const toggle = () => toggleModalDenied();
  const deniedFeeTerminal = async () => {
    const descriptionDenied = getDescription(arrDeniedDesc, infoCodeDenied);
    try {
      const data = {
        terminalId: terminalDetail && terminalDetail.terminalBean && terminalDetail.terminalBean.terminalId,
        merchantId: terminalDetail && terminalDetail.terminalBean && terminalDetail.terminalBean.merchantId,
        processUser: terminalDetail && terminalDetail.terminalBean && terminalDetail.terminalBean.processUser,
        processAddition: noteDenied,
        status: 4,
        idDeniend: infoCodeDenied,
        descDeniend: descriptionDenied,
        merchantCreateUserEmail: terminalDetail && terminalDetail.terminalBean && terminalDetail.merchantBean.createUserEmail,
        merchantCode: terminalDetail && terminalDetail.terminalBean && terminalDetail.merchantBean.merchantCode,
        merchantName: terminalDetail && terminalDetail.terminalBean && terminalDetail.merchantBean.merchantName,
        merchantBrand: terminalDetail && terminalDetail.terminalBean && terminalDetail.merchantBean.merchantBrand,
        terminalName: terminalDetail && terminalDetail.terminalBean && terminalDetail.terminalBean.terminalName,
      };
      await deniedTerminal(data);
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
        <ModalHeader toggle={toggle}><div className="text-center">Lý do từ chối Terminal</div></ModalHeader>
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
          <Button color="primary" onClick={deniedFeeTerminal}>
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
  arrDeniedDesc: PropTypes.array,
  history: PropTypes.object,
  terminalDetail: PropTypes.object,
};

Refuse.defaultProps = {
  toggleModalDenied: () => {},
  arrDeniedDesc: [],
  history: {},
  terminalDetail: () => {},
};

const mapStateToProps = (state, ownProps) => ({
  terminalDetail: state.terminal.terminalDetail,
});

const mapDispatchToProps = (dispatch) => ({
  deniedTerminal: (data) => dispatch(deniedTerminal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Refuse));
