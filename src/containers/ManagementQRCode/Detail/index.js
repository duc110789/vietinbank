import React, {Component} from 'react';
import {withRouter,} from 'react-router-dom';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-validation/build/form';
import moment from 'moment';
import Media from 'reactstrap/es/Media';
import {getQrCode,} from '../../../store/actions/qRCode/qRCode';
import Constants from '../Constants';
import {numberWithDots} from "../../../utils/commonFunction";

class DetailQrCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      expDate: '',
      desc: '',
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
      qrCodeDetail,
    } = this.props;

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

  handleSave = () => {
    const { history } = this.props;
    history.push({
      pathname: '/qrcode/createResult',
    });
  };

  render() {
    const {
      amount,
      qrCodeDetail,
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
                    <span className="text-bold">{Constants.QRCode.titleDetailQrCode}</span>
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
                        {Constants.QRCode.visaPan}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        {
                          qrCodeDetail && qrCodeDetail.data
                          && qrCodeDetail.data.visa
                        }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      <Label>
                        {Constants.QRCode.masterCardPan}
                      </Label>
                    </Col>
                    <Col lg="6">
                      <Label>
                        {
                          qrCodeDetail && qrCodeDetail.data
                          && qrCodeDetail.data.master
                        }
                      </Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="6">
                      {Constants.QRCode.jcbPan}
                    </Col>
                    <Col lg="6">
                      <Label>
                        {
                          qrCodeDetail && qrCodeDetail.data
                          && qrCodeDetail.data.jcbPan
                        }
                      </Label>
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
                      <Label>
                        {qrCodeDetail && qrCodeDetail.data
                        && qrCodeDetail.data.productName}
                      </Label>
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
                      <Label>
                        {numberWithDots(amount)}
                      </Label>
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
                      <Label>
                        VNĐ
                      </Label>
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
                      <Label>
                        {qrCodeDetail && qrCodeDetail.data
                        && qrCodeDetail.data.note}
                      </Label>
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
                      <Label>
                        {qrCodeDetail && qrCodeDetail.data
                        && qrCodeDetail.data.expireDate}
                      </Label>
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
                            alt="image"
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
  getQrCode: (data) => dispatch(getQrCode(data)),
});

DetailQrCode.defaultProps = {
  getQrCode: () => {},
  history: {},
};

DetailQrCode.propTypes = {
  getQrCode: PropTypes.func,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailQrCode));
