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
import Media from 'reactstrap/es/Media';
import { editQrCode, getQrCode } from '../../../store/actions/qRCode/qRCode';
import {
  checkContainSpecialCharacters,
  checkFormatImage,
  checkRequiredInput,
  checkRequiredSelect,
  isValidVietnamese,
} from '../../../components/Input/validation';
import Constants from '../Constants';
import CONST_VARIABLE from '../../../utils/constants';
import { messageError, messageWarning } from '../../../utils';

class EditQRCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileReader: new FileReader(),
      validateForm: false,
      productName: '',
      amount: '',
      expDate: '',
      desc: '',
      image: {
        fileName: '',
        fileData: [],
      },
    };
  }

  componentDidMount() {
    const {
      getQrCode,
    } = this.props;
    getQrCode({
      qrcodeId: JSON.parse(window.atob(localStorage.getItem('ID_QRCODE'))),
    });
  }

  static getDerivedStateFromProps(props) {
    const {
      qrCodeDetail,
    } = props;

    return {
      qrCodeDetail,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      responseServerEdit,
      history,
      getQrCode,
      qrCodeDetail,
    } = this.props;

    if (responseServerEdit !== prevProps.responseServerEdit) {
      if (responseServerEdit.code !== '00') {
        messageError(responseServerEdit.description);
      } else if (responseServerEdit.code === '00') {
        getQrCode({
          qrcodeId: responseServerEdit.data.qrcodeId,
        });
        history.push({
          pathname: '/QRCode/createResult',
        });
      }
    }
    if (qrCodeDetail !== prevProps.qrCodeDetail) {
      this.setState({
        des: qrCodeDetail && qrCodeDetail.data
          && qrCodeDetail.data.note ? qrCodeDetail.data.note : '',
        amount: qrCodeDetail && qrCodeDetail.data
          && qrCodeDetail.data.amount,
        expDate: (qrCodeDetail && qrCodeDetail.data && qrCodeDetail.data.expireDate)
          ? new Date(moment(qrCodeDetail && qrCodeDetail.data
          && qrCodeDetail.data.expireDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM/DD/YYYY 23:59:59')) : '',
      });
    }
  }

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

  checkFileSize = (e) => e.target.files[0].size > CONST_VARIABLE.MAX_FILE_SIZE_UPLOAD_IMAGE_CREATE_QR;

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
      productName,
      amount,
      expDate,
      desc,
      image,
    } = this.state;
    const {
      qrCodeDetail,
    } = this.props;
    this.setState({
      validateForm: true,
    });
    this.form.validateAll();
    const { editQrCode } = this.props;

    const dataEditQrProduct = {
      qrcodeId: qrCodeDetail && qrCodeDetail.data
        && qrCodeDetail.data.id,
      productName: productName || (qrCodeDetail && qrCodeDetail.data
        && qrCodeDetail.data.productName),
      amount,
      ccyCode: '704',
      note: desc,
      expireDate: moment(expDate, ['DD/MM/YYYY', 'MM/DD/YYYY']).format('DD/MM/YYYY 23:59:59') || new Date().toString(),
      payType: '02',
      image,
      dataQr: '',
    };

    const errors = this.form.getChildContext()._errors.length;

    if (errors === 0) {
      editQrCode(dataEditQrProduct);
    }
  };

  render() {
    const {
      validateForm,
      productName,
      amount,
      desc,
      expDate,
      qrCodeDetail,
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
                    <span className="text-bold">{Constants.QRCode.titleEditQRCode}</span>
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
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        {
                          qrCodeDetail && qrCodeDetail.data
                          && `${qrCodeDetail.data.merchantCode}-${qrCodeDetail.data.merchantName}`
                        }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.pointSale}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        {
                          qrCodeDetail && qrCodeDetail.data
                          && `${qrCodeDetail.data.terminalID}-${qrCodeDetail.data.terminalName}`
                        }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.infoInternational}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <div className="row">
                        <div className="col-md-6">
                          {Constants.QRCode.visaPan}
                        </div>
                        <div className="col-md-6">
                          {
                            qrCodeDetail && qrCodeDetail.data
                            && qrCodeDetail.data.visa
                          }
                        </div>
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6" />
                    <Col lg="6">
                      <div className="row">
                        <div className="col-md-6">
                          {Constants.QRCode.masterCardPan}
                        </div>
                        <div className="col-md-6">
                          {
                            qrCodeDetail && qrCodeDetail.data
                            && qrCodeDetail.data.master
                          }
                        </div>
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6" />
                    <Col lg="6">
                      <div className="row">
                        <div className="col-md-6">
                          {Constants.QRCode.jcbPan}
                        </div>
                        <div className="col-md-6">
                          {
                            qrCodeDetail && qrCodeDetail.data
                            && qrCodeDetail.data.jcbPan
                          }
                        </div>
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.productCode}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        {
                          qrCodeDetail && qrCodeDetail.data
                          && qrCodeDetail.data.productID
                        }
                      </Label>
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
                        value={productName || (qrCodeDetail && qrCodeDetail.data
                          && qrCodeDetail.data.productName)}
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
                        value={amount}
                        label={Constants.QRCode.productName}
                        thousandSeparator
                        allowNegative={false}
                        maxLength={13}
                        onChange={this.handleChangeProductPrice}
                      />
                      {
                        validateForm && checkRequiredSelect(amount,
                          Constants.QRCode.productPrice)
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6" className="label-left">
                      <Label htmlFor="code">
                        {Constants.MnMerchant.currency}
                        {' '}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Select
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
                        value={desc || (qrCodeDetail && qrCodeDetail.data
                        && qrCodeDetail.data.note)}
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
                      { qrCodeDetail && qrCodeDetail.data
                      && qrCodeDetail.data.imageUrl ? (
                        <figure className="mt-3">
                          <Media
                            title={qrCodeDetail && qrCodeDetail.data
                            && qrCodeDetail.data.imageName}
                            style={{ maxWidth: '300px' }}
                            object
                            src={qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.imageUrl}
                            alt="Generic placeholder image"
                          />
                        </figure>
                        ) : ('')}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.createTime}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        {qrCodeDetail && qrCodeDetail.data
                        && qrCodeDetail.data.createdDate}
                      </Label>
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
                        {Constants.QRCode.cancel}
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
  responseServerEdit: state.qRCode.responseServerEdit,
  qrCodeDetail: state.qRCode.qrCodeDetail,
});

const mapDispatchToProps = (dispatch) => ({
  editQrCode: (data) => dispatch(editQrCode(data)),
  getQrCode: (data) => dispatch(getQrCode(data)),
});

EditQRCode.defaultProps = {
  editQrCode: () => {},
  getQrCode: () => {},
  responseServerEdit: {},
  history: {},
};

EditQRCode.propTypes = {
  editQrCode: PropTypes.func,
  getQrCode: PropTypes.func,
  responseServerEdit: PropTypes.object,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditQRCode));
