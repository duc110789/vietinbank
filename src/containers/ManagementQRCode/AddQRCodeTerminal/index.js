import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import {clearMerchantCodeName, getMerchantCodeName} from '../../../store/actions/masterMerchant/masterMerchant';
import { getCacheTerminal } from '../../../store/actions/terminal/terminal';
import { addQrCode, getQrCode } from '../../../store/actions/qRCode/qRCode';
import {
  checkContainSpecialCharacters,
  checkRequiredSelect,
  isValidVietnamese,
} from '../../../components/Input/validation';
import Constants from '../Constants';
import { messageError } from '../../../utils';

class AddQRCodeTerminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateForm: false,
      merchantCode: '',
      terminalId: '',
      productId: '',
      productName: '',
      payType: '03',
      amount: '',
      expDate: '',
      desc: '',
      creator: '',
      image: {
        fileName: '',
        fileData: [],
      },
      isDisAbledTerminal: true
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      listMerchantCodeName,
      cacheTerminal,
    } = props;

    const updateListMerchantCodeName = [];
    if (listMerchantCodeName) {
      for (let i = 0; i < listMerchantCodeName.length; i += 1) {
        updateListMerchantCodeName.push(
          {
            value: listMerchantCodeName[i].merchantCode,
            label: `${listMerchantCodeName[i].merchantCode} - ${listMerchantCodeName[i].merchantName}`,
          },
        );
      }
    }

    const updateCacheTerminal = [];
    if (cacheTerminal) {
      for (let i = 0; i < cacheTerminal.length; i += 1) {
        updateCacheTerminal.push({
          value: cacheTerminal[i].terminalId,
          label: `${cacheTerminal[i].terminalId} - ${cacheTerminal[i].terminalName}`,
        });
      }
    }

    return {
      listMerchantCodeName: updateListMerchantCodeName,
      cacheTerminal: updateCacheTerminal,
    };
  }

  componentDidUpdate(prevProps) {
    const { responseServer, history } = this.props;
    if (responseServer !== prevProps.responseServer) {
      if (responseServer.code !== '00') {
        messageError(responseServer.description);
      } else {
        if (responseServer.code === '00') {
          localStorage.setItem('ID_QRCODE_TERMINAL', window.btoa(JSON.stringify(responseServer.data && responseServer.data.idQrcode)))
        }
        history.push({
          pathname: '/qrcode/qrcode-terminal/create-result',
        });
      }
    }
  }

  componentWillUnmount() {
    const { clearMerchantCodeName } = this.props;
    clearMerchantCodeName();
  }

  handleChangeMerchant = (merchantCodeOption) => {
    const {
      getCacheTerminal,
    } = this.props;
    if(merchantCodeOption){
      this.setState({
        merchantCode: merchantCodeOption,
        terminalId: '',
        isDisAbledTerminal: false
      }, () => {
        getCacheTerminal({
          merchantCode: merchantCodeOption.value,
          status: '1',
          terminalBranchId: '',
          allTerminal: true,
        });
      });
    }else{
      this.setState({
        merchantCode: '',
        terminalId: '',
        isDisAbledTerminal: true
      })
    }
  };

  handleChangeCacheTerminal = (cacheTerminalOption) => {
    if (cacheTerminalOption) {
      this.setState({
        terminalId: cacheTerminalOption,
      });
    }else{
      this.setState({
        terminalId: '',
      });
    }
  };

  handleChangeProductNote = (event) => {
    this.setState({
      desc: event.target.value,
    });
  };

  handleSave = () => {
    const {
      merchantCode,
      terminalId,
      productId,
      productName,
      payType,
      amount,
      expDate,
      desc,
      creator,
      image,
    } = this.state;
    this.setState({
      validateForm: true,
    });
    this.form.validateAll();
    const { addQrCode } = this.props;

    const dataAddQrProduct = {
      merchantCode: merchantCode.value,
      terminalId: terminalId.value,
      productId,
      productName,
      payType,
      amount,
      expDate,
      desc,
      creator,
      image,
    };

    const errors = this.form.getChildContext()._errors.length;

    if (errors === 0 && merchantCode.value) {
      addQrCode(dataAddQrProduct);
    }
  };

  onInputChangeMerchant = (value) => {
    const { getMerchantCodeName } = this.props;
    if (value && value.length > 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        getMerchantCodeName({
          status: '1',
          paternSearch: value,
        });
      }, 500);
    }
  };

  render() {
    const {
      listMerchantCodeName,
      cacheTerminal,
      validateForm,
      merchantCode,
      terminalId,
      isDisAbledTerminal
    } = this.state;

    const { history } = this.props;

    return (
      <div className="my-requests">
        <Form className="widget-box transparent" ref={(addQRCode) => { this.form = addQRCode; }}>
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="6" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.QRCode.titleAddQRCodeTerminal}</span>
                  </Col>
                </FormGroup>
              </Col>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="col-md-2 col-2" />
                <Col className="col-md-8 col-8">
                  <FormGroup row>
                    <Col lg="6" className="label-left">
                      <Label htmlFor="code">
                        {Constants.MerchantDetail.mcId}
                        {' '}
                        -
                        {' '}
                        {Constants.MnMerchant.merchantName}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Select
                        isClearable
                        onInputChange={this.onInputChangeMerchant}
                        onChange={this.handleChangeMerchant}
                        options={listMerchantCodeName}
                        placeholder="Chọn"
                      />
                      {
                        validateForm && checkRequiredSelect(merchantCode && merchantCode.value,
                          Constants.MnMerchant.merchantName)
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.pointSale}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Select
                        isClearable
                        isDisabled={isDisAbledTerminal}
                        onChange={this.handleChangeCacheTerminal}
                        options={cacheTerminal}
                        placeholder="Chọn"
                        value={terminalId}
                      />
                      {
                        validateForm && checkRequiredSelect(terminalId && terminalId.value,
                          Constants.QRCode.pointSaleCode)
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6" className="label-left">
                      <Label htmlFor="code">
                        {Constants.MnMerchant.currency}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Select
                        value={{ value: '0', label: 'VNĐ' }}
                        options={[
                          { value: '0', label: 'VNĐ' },
                        ]}
                        placeholder="VNĐ"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.productNote}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Input
                        value=""
                        label={Constants.QRCode.productNote}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeProductNote}
                        maxLength={19}
                        validations={[
                          checkContainSpecialCharacters,
                          isValidVietnamese,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col className="col-md-2 col-2" />
              </Row>
            </CardBody>
            <CardFooter>
              <Col md="12">
                <Row>
                  <Col className="text-center btn-search">
                    <div>
                      <Button className="icon-search btn btn-primary btn btn-secondary mr-3" onClick={() => this.handleSave()}>
                        {Constants.QRCode.createQRCode}
                      </Button>
                      <Button className="icon-search btn btn-primary btn btn-secondary" onClick={history.goBack}>
                        {Constants.QRCode.goBack}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </CardFooter>
          </Card>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  responseServer: state.qRCode.responseServer,
  listMerchantCodeName: state.masterMerchant.listMerchantCodeName,
  cacheTerminal: state.terminal.cacheTerminal,
});

const mapDispatchToProps = (dispatch) => ({
  addQrCode: (data) => dispatch(addQrCode(data)),
  getQrCode: (data) => dispatch(getQrCode(data)),
  getMerchantCodeName: (data) => dispatch(getMerchantCodeName(data)),
  getCacheTerminal: (data) => dispatch(getCacheTerminal(data)),
  clearMerchantCodeName: () => dispatch(clearMerchantCodeName()),
});

AddQRCodeTerminal.defaultProps = {
  addQrCode: () => {},
  getQrCode: () => {},
  getCacheTerminal: () => {},
  getMerchantCodeName: () => {},
  responseServer: {},
  history: {},
};

AddQRCodeTerminal.propTypes = {
  addQrCode: PropTypes.func,
  getQrCode: PropTypes.func,
  getCacheTerminal: PropTypes.func,
  getMerchantCodeName: PropTypes.func,
  responseServer: PropTypes.object,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddQRCodeTerminal));
