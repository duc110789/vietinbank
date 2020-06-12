import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Input as RInput, Label, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import {clearMerchantCodeName, getMerchantCodeName} from '../../../store/actions/masterMerchant/masterMerchant';
import { getCacheTerminal } from '../../../store/actions/terminal/terminal';
import { addQrCode, getQrCode } from '../../../store/actions/qRCode/qRCode';
import {
  checkContainSpace,
  checkContainSpecialCharacters,
  checkFormatImage,
  checkRequiredInput,
  checkRequiredSelect,
  checkRequiredSelectInput,
  isValidVietnamese,
} from '../../../components/Input/validation';
import Constants from '../Constants';
import CONST_VARIABLE from '../../../utils/constants';
import { messageError, messageWarning } from '../../../utils';

class AddQRCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileReader: new FileReader(),
      validateForm: false,
      merchantCode: '',
      terminalId: '',
      productId: '',
      productName: '',
      payType: '02',
      amount: '',
      expDate: '',
      desc: '',
      creator: '',
      image: {
        fileName: '',
        fileData: [],
      },
      isDisAbleCacheTerminal: true
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
          localStorage.setItem('ID_QRCODE', window.btoa(JSON.stringify(responseServer.data && responseServer.data.idQrcode)));
        }
        history.push({
          pathname: '/qrcode/createResult',
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
        isDisAbleCacheTerminal: false
      }, () => {
        getCacheTerminal({
          merchantCode: merchantCodeOption.value,
          status: '1',
          terminalBranchId: '',
          allTerminal: true,
        });
      });
    }
    if(!merchantCodeOption){
      this.setState({
        merchantCode: '',
        terminalId: '',
        isDisAbleCacheTerminal: true
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
      })
    }
  };

  handleChangeProductCode = (event) => {
    this.setState({
      productId: event.target.value.toString().toUpperCase(),
    });
  };

  handleChangeProductName = (event) => {
    this.setState({
      productName: event.target.value,
    });
  };

  handleChangeProductPrice = (event) => {
    this.setState({
      amount: event.target.value.replace(/,/g, ''),
    });
  };

  handleChangeExpired = (expirationDateSelected) => {
    this.setState({
      expDate: expirationDateSelected,
    });
  };


  handleChangeProductNote = (event) => {
    this.setState({
      desc: event.target.value,
    });
  };

  checkFileSize = (e) => e.target.files[0].size
    > CONST_VARIABLE.MAX_FILE_SIZE_UPLOAD_IMAGE_CREATE_QR;

  handleFileReaderUpload = (e) => {
    const { fileReader } = this.state;
    const contentFile = fileReader.result;
    const arrDataByte = new Int8Array(contentFile);

    this.setState((prevState) => ({
      image: {
        ...prevState.image,
        fileData: Array.from(arrDataByte),
      },
    }));
  };

  onChangeImageUpload = (e) => {
    const { fileReader } = this.state;
    const file = e.target.files[0];
    if (!file || file.length === 0) {
      return;
    }

    if (this.checkFileSize(e)) {
      messageWarning('Kích thước file phải nhỏ hơn 3M!');
      e.target.value = '';
    } else {
      this.setState((prevState) => ({
        image: {
          ...prevState.image,
          fileName: file.name,
        },
      }));

      fileReader.onloadend = this.handleFileReaderUpload;
      fileReader.readAsArrayBuffer(file);
    }
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
      expDate: expDate ? moment(expDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('DD/MM/YYYY 23:59:59') : '',
      desc,
      creator,
      image,
    };

    const errors = this.form.getChildContext()._errors.length;

    if (errors === 0 && merchantCode.value && terminalId.value
      && productId && productName && amount) {
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
      productId,
      productName,
      amount,
      expDate,
      isDisAbleCacheTerminal
    } = this.state;

    const { history } = this.props;

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    return (
      <div className="my-requests">
        <Form className="widget-box transparent" ref={(addQRCode) => { this.form = addQRCode; }}>
          <Card className="card-my-requests">
            <CardHeader>
              <Col xs="12">
                <FormGroup style={{ marginBottom: 0 }} row>
                  <Col lg="6" style={{ paddingLeft: 0 }}>
                    <span className="text-bold">{Constants.QRCode.titleAddQRCode}</span>
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
                          'Merchant')
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.pointSale}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Select
                        isClearable
                        isDisabled={isDisAbleCacheTerminal}
                        value={terminalId}
                        onChange={this.handleChangeCacheTerminal}
                        options={cacheTerminal}
                        placeholder="Chọn"
                      />
                      {
                        validateForm && checkRequiredSelect(terminalId && terminalId.value,
                          'Mã điểm bán')
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.productCode}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Input
                        value={productId.toUpperCase()}
                        label={Constants.QRCode.productCode}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeProductCode}
                        maxLength={13}
                        validations={[
                          checkRequiredInput,
                          checkContainSpace,
                          checkContainSpecialCharacters,
                          isValidVietnamese,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.productName}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Input
                        value={productName}
                        label={Constants.QRCode.productName}
                        type="text"
                        className="form-control"
                        name="code"
                        onChange={this.handleChangeProductName}
                        maxLength={19}
                        validations={[
                          checkRequiredInput,
                          checkContainSpecialCharacters,
                          isValidVietnamese,
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.productPrice}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="6">
                      <NumberFormat
                        className="form-control"
                        thousandSeparator
                        maxLength={13}
                        onChange={this.handleChangeProductPrice}
                      />
                      {
                        validateForm && checkRequiredSelectInput(amount,
                          Constants.QRCode.productPrice)
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
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.expireQRCode}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <DatePicker
                        selected={expDate}
                        onChange={this.handleChangeExpired}
                        className="form-control"
                        dateFormat="dd/MM/yyyy 23:59:59"
                        minDate={tomorrow}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.productImage}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <RInput
                        label={Constants.QRCode.productImage}
                        name="image"
                        onChange={this.onChangeImageUpload}
                        type="file"
                        accept="image/x-png,image/jpg,image/jpeg"
                        validations={[
                          checkFormatImage,
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

AddQRCode.defaultProps = {
  addQrCode: () => {},
  getQrCode: () => {},
  getCacheTerminal: () => {},
  getMerchantCodeName: () => {},
  responseServer: {},
  history: {},
};

AddQRCode.propTypes = {
  addQrCode: PropTypes.func,
  getQrCode: PropTypes.func,
  getCacheTerminal: PropTypes.func,
  getMerchantCodeName: PropTypes.func,
  responseServer: PropTypes.object,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddQRCode));
