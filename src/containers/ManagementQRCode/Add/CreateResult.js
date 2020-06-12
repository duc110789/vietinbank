import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-validation/build/form';
import domtoimage from 'dom-to-image';
import ReactToPrint from 'react-to-print';
import * as QRCode from 'easyqrcodejs';
import Constants from '../Constants';
import { getQrCode } from '../../../store/actions/qRCode/qRCode';
import { numberWithDots } from '../../../utils/commonFunction';
import ComponentToPrint from '../Print';

class CreateResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeDetail: {},
    };
    this.qrcode = React.createRef();
    this.qrcodeDownload = React.createRef();
    this.qrcodePrint = React.createRef();
  }

  static getDerivedStateFromProps(props) {
    const {
      qrCodeDetail,
    } = props;

    return {
      qrCodeDetail,
    };
  }

  componentDidMount() {
    const {
      getQrCode,
    } = this.props;

    if (localStorage.getItem('ID_QRCODE')) {
      getQrCode({
        qrcodeId: JSON.parse(window.atob(localStorage.getItem('ID_QRCODE'))),
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { qrCodeDetail } = this.props;

    if (qrCodeDetail !== prevProps.qrCodeDetail) {
      const options = {
        text: qrCodeDetail.data.qrData,
        PO_TL: '#005AAB',
        PI_TL: '#005AAB',
        PO_TR: '#005AAB',
        PI_TR: '#005AAB',
        PO_BL: '#C9181E',
        PI_BL: '#C9181E',
      };

      new QRCode(this.qrcode.current, options);
      new QRCode(this.qrcodeDownload.current, options);
      new QRCode(this.qrcodePrint.current, options);
    }
  }

  downloadImageQr = () => {
    const node = document.getElementById('htmlQR');

    domtoimage.toPng(node)
      .then((dataUrl) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = 'QRCODE.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  render() {
    const { history } = this.props;
    const {
      qrCodeDetail,
    } = this.state;
    return (
      <div className="my-requests" id="test" style={{ position: 'relative' }}>
        <>
          <Form className="widget-box transparent" ref={(createResult) => { this.form = createResult; }}>
            <Card className="card-my-requests">
              <CardHeader>
                <Col xs="12">
                  <FormGroup style={{ marginBottom: 0 }} row>
                    <Col lg="6" style={{ paddingLeft: 0 }}>
                      <span className="text-bold">{Constants.QRCode.titleCreateResult}</span>
                    </Col>
                  </FormGroup>
                </Col>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="col-md-4 col-12">
                    <FormGroup row className="text-center btn-search">
                      <Col lg="12" className="mb-2 container-qrcode pd-22-percent">
                        {qrCodeDetail && qrCodeDetail.data && qrCodeDetail.data.qrData && (
                          <div id="qrcode" ref={this.qrcode} />
                        )}
                      </Col>
                      <Col lg="12" className="mb-2">
                        <Button
                          className="icon-search btn btn-primary btn btn-secondary"
                          onClick={() => this.downloadImageQr()}
                          style={{ width: '75%' }}
                        >
                          {Constants.QRCode.qrSave}
                        </Button>
                      </Col>
                      <Col lg="12" className="mb-2">
                        <ReactToPrint
                          trigger={() => (
                            <Button
                              className="icon-search btn btn-primary btn btn-secondary"
                              style={{ width: '75%' }}
                            >
                              {Constants.QRCode.printQRCode}
                            </Button>
                          )}
                          content={() => this.componentRef}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col className="col-md-8">
                    <table className="fee-table__table w-100">
                      <thead>
                        <tr>
                          <th className="text-left">{Constants.QRCode.fieldName}</th>
                          <th>{Constants.QRCode.tag}</th>
                          <th>{Constants.QRCode.valueName}</th>
                          <th>{Constants.QRCode.valueTag}</th>
                          <th>{Constants.QRCode.data}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th className="text-left">{Constants.QRCode.dataVersion}</th>
                          <td />
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.plIndicator) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.initializationMethod}</th>
                          <td>01</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.pointOfMethod) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.visaPan}</th>
                          <td>02</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.visa) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.masterCardPan}</th>
                          <td>04</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.master) || 0
                          }
                          </td>
                        </tr>
                        <tr className="text-left">
                          <th className="text-left">{Constants.QRCode.jcbPan}</th>
                          <td>13</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.jcbPan) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.indentifyMechant}</th>
                          <td>26</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.merchantID) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.catalogCodeMerchant}</th>
                          <td>52</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.merchantType) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.currencyCode}</th>
                          <td>53</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.ccy) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.transactionAmount}</th>
                          <td>54</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && numberWithDots(qrCodeDetail.data.amount)) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.countryCode}</th>
                          <td>58</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.countryCode) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.merchantName}</th>
                          <td>59</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.merchantName) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.city}</th>
                          <td>60</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.merchantCity) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.zipCode}</th>
                          <td>61</td>
                          <td />
                          <td />
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.pinCode) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <th className="text-left">{Constants.QRCode.additionalInfo}</th>
                          <td>62</td>
                          <td>{Constants.MerchantDetail.terminalName}</td>
                          <td>03</td>
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.storeID) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td>{Constants.QRCode.productCode}</td>
                          <td>05</td>
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.referenceID) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td>{Constants.MerchantDetail.terminalID}</td>
                          <td>07</td>
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.terminalID) || 0
                          }
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td>{Constants.MerchantDetail.purpose}</td>
                          <td>08</td>
                          <td>
                            {
                            (qrCodeDetail && qrCodeDetail.data
                              && qrCodeDetail.data.perpose) || 0
                          }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Col md="12">
                  <Row>
                    <Col className="text-center btn-search">
                      <div>
                        <Button onClick={() => history.push('/qrcode/list')} onKeyPress={history.goBack} title="Về danh sách" className="btn bggrey bigger-150 mr-3 text-white">
                          <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                          {Constants.QRCode.goBack}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </CardFooter>
            </Card>
          </Form>
        </>
        <div
          id="htmlQR"
          style={{
            position: 'absolute', zIndex: -1, top: 0, height: 800, width: 800,
          }}
        >
          <Row>
            <Col md={6}>
              <h1 className="qr-download text-center mb-20 font-size-24">{Constants.QRCode.vietinbankQrPay}</h1>
            </Col>
          </Row>
          <Row>
            <Col md="6" className="text-center container-qrcode pd-11-percent">
              <div id="qrcode-download" ref={this.qrcodeDownload} />
            </Col>
            <Col md="6" className="text-left">
              <p className="qr-download mt-80">
                Doanh nghiệp:
                {' '}
                {qrCodeDetail && qrCodeDetail.data && qrCodeDetail.data.merchantName ? qrCodeDetail.data.merchantName : ''}
              </p>
              <p className="qr-download">
                Điểm bán:
                {' '}
                {qrCodeDetail && qrCodeDetail.data && qrCodeDetail.data.terminalID ? qrCodeDetail.data.terminalID : ''}
              </p>
              <p className="qr-download">
                Mã sản phẩm:
                {' '}
                {qrCodeDetail && qrCodeDetail.data && qrCodeDetail.data.referenceID ? qrCodeDetail.data.referenceID : ''}
              </p>
              <p className="qr-download">
                Tên sản phẩm:
                {' '}
                {qrCodeDetail && qrCodeDetail.data && qrCodeDetail.data.merchantName ? qrCodeDetail.data.merchantName : ''}
              </p>
              <p className="qr-download">
                Giá tiền:
                {' '}
                {qrCodeDetail && qrCodeDetail.data && qrCodeDetail.data.amount ? numberWithDots(qrCodeDetail.data.amount) : ''}
                {' '}
                VNĐ
              </p>
            </Col>
          </Row>
        </div>
        <div style={{ display: 'none' }}>
          <ComponentToPrint
            qrcodePrint={this.qrcodePrint}
            ref={(el) => this.componentRef = el}
            qrCodeDetail={qrCodeDetail}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  responseServer: state.qRCode.responseServer,
  qrCodeDetail: state.qRCode.qrCodeDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getQrCode: (data) => dispatch(getQrCode(data)),
});

CreateResult.defaultProps = {
  history: {},
  getQrCode: () => {},
};

CreateResult.propTypes = {
  history: PropTypes.object,
  getQrCode: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateResult));
