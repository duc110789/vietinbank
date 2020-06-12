import React from 'react';
import {
  Collapse, CardBody, Card, Label, Row, Col, FormGroup, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Constants from '../Constants';
import CONST_VARIABLE from '../../../utils/constants';
import {
  checkRequiredSelect,
} from '../../../components/Input/validation';
import {messageWarning} from '../../../utils';
import { scroll } from '../../../utils/commonFunction';

class AttachmentDocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenInfo: true,
      fileReader: new FileReader(),
      businessLicence: {
        nameBusinessLicence: '',
        dataFileBusinessLicence: '',
      },
      domainLicence: {
        nameDomainLicence: '',
        dataFileDomainLicence: '',
      },
      identityCard: {
        nameIdentityCard: '',
        dataFileIdentityCard: '',
      },
      accountLicence: {
        nameAccountLicence: '',
        dataFileAccountLicence: '',
      },
      contractSign: {
        nameContractSign: '',
        dataFileContractSign: '',
      },
    };
  }

  componentDidUpdate(prevProps) {
    const {
      passDataAttachment,
      validateForm,
    } = this.props;
    const {
      businessLicence,
      domainLicence,
      identityCard,
      accountLicence,
      contractSign,
    } = this.state;
    const dataAttachment = {
      businessLicence,
      domainLicence,
      identityCard,
      accountLicence,
      contractSign,
    };
    if (validateForm !== prevProps.validateForm) {
      if (checkRequiredSelect(businessLicence.nameBusinessLicence) !== false) {
        scroll('add-business-licence');
      }
    }
    passDataAttachment(dataAttachment);
  }

  handOpenInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  checkFileSize = (e) => e.target.files[0].size > CONST_VARIABLE.MAX_FILE_SIZE_UPLOAD

  handleFileReaderBusiness = (e) => {
    const { fileReader } = this.state;
    const contentFile = fileReader.result;
    const arrDataByte = new Int8Array(contentFile);

    this.setState((prevState) => ({
      businessLicence: {
        ...prevState.businessLicence,
        dataFileBusinessLicence: Array.from(arrDataByte),
      },
    }));
  };

  onChangeBusinessLicence = (e) => {
    const { fileReader } = this.state;
    const file = e.target.files[0];
    if (!file || file.length === 0) {
      return;
    }

    if (this.checkFileSize(e)) {
      messageWarning('Kích thước file phải nhỏ hơn 5M!');
      e.target.value = '';
    } else {
      this.setState((prevState) => ({
        businessLicence: {
          ...prevState.businessLicence,
          nameBusinessLicence: file.name,
        },
      }));

      fileReader.onloadend = this.handleFileReaderBusiness;
      fileReader.readAsArrayBuffer(file);
    }
  };

  handleFileReaderDomain = (e) => {
    const { fileReader } = this.state;
    const contentFile = fileReader.result;
    const arrDataByte = new Int8Array(contentFile);

    this.setState((prevState) => ({
      domainLicence: {
        ...prevState.domainLicence,
        dataFileDomainLicence: Array.from(arrDataByte),
      },
    }));
  };

  onChangeDomainLicence = (e) => {
    const { fileReader } = this.state;
    const file = e.target.files[0];
    if (!file || file.length === 0) {
      return;
    }

    if (this.checkFileSize(e)) {
      messageWarning('Kích thước file phải nhỏ hơn 5M!');
      e.target.value = '';
    } else {
      this.setState((prevState) => ({
        domainLicence: {
          ...prevState.domainLicence,
          nameDomainLicence: file.name,
        },
      }));

      fileReader.onloadend = this.handleFileReaderDomain;
      fileReader.readAsArrayBuffer(file);
    }
  };

  handleFileIdentityCard = (e) => {
    const { fileReader } = this.state;
    const contentFile = fileReader.result;
    const arrDataByte = new Int8Array(contentFile);

    this.setState((prevState) => ({
      identityCard: {
        ...prevState.identityCard,
        dataFileIdentityCard: Array.from(arrDataByte),
      },
    }));
  };

  onChangeIdentityCard = (e) => {
    const { fileReader } = this.state;
    const file = e.target.files[0];
    if (!file || file.length === 0) {
      return;
    }

    if (this.checkFileSize(e)) {
      messageWarning('Kích thước file phải nhỏ hơn 5M!');
      e.target.value = '';
    } else {
      this.setState((prevState) => ({
        identityCard: {
          ...prevState.identityCard,
          nameIdentityCard: file.name,
        },
      }));

      fileReader.onloadend = this.handleFileIdentityCard;
      fileReader.readAsArrayBuffer(file);
    }
  };

  handleFileReaderAccountLicence = (e) => {
    const { fileReader } = this.state;
    const contentFile = fileReader.result;
    const arrDataByte = new Int8Array(contentFile);

    this.setState((prevState) => ({
      accountLicence: {
        ...prevState.accountLicence,
        dataFileAccountLicence: Array.from(arrDataByte),
      },
    }));
  };

  onChangeAccountLicence = (e) => {
    const { fileReader } = this.state;
    const file = e.target.files[0];
    if (!file || file.length === 0) {
      return;
    }

    if (this.checkFileSize(e)) {
      messageWarning('Kích thước file phải nhỏ hơn 5M!');
      e.target.value = '';
    } else {
      this.setState((prevState) => ({
        accountLicence: {
          ...prevState.accountLicence,
          nameAccountLicence: file.name,
        },
      }));
      fileReader.onloadend = this.handleFileReaderAccountLicence;
      fileReader.readAsArrayBuffer(file);
    }
  };

  handleFileReaderContractSign = (e) => {
    const { fileReader } = this.state;
    const contentFile = fileReader.result;
    const arrDataByte = new Int8Array(contentFile);

    this.setState((prevState) => ({
      contractSign: {
        ...prevState.contractSign,
        dataFileContractSign: Array.from(arrDataByte),
      },
    }));
  };

  onChangeContractSign = (e) => {
    const { fileReader } = this.state;
    const file = e.target.files[0];
    if (!file || file.length === 0) {
      return;
    }

    if (this.checkFileSize(e)) {
      messageWarning('Kích thước file phải nhỏ hơn 5M!');
      e.target.value = '';
    } else {
      this.setState((prevState) => ({
        contractSign: {
          ...prevState.contractSign,
          nameContractSign: file.name,
        },
      }));

      fileReader.onloadend = this.handleFileReaderContractSign;
      fileReader.readAsArrayBuffer(file);
    }
  };

  render() {
    const {
      isOpenInfo,
      businessLicence,
    } = this.state;
    const { validateForm } = this.props;
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div className="widget-header widget-header-flat" role="presentation" onClick={this.handOpenInfo} onKeyPress={this.handOpenInfo}>
              <span className="text-bold">{Constants.MnMerchant.attachments}</span>
              <div className="widget-toolbar">
                <span data-action="collapse">
                  {isOpenInfo ? (
                    <i className="ace-icon fa fa-chevron-up" />
                  ) : (
                    <i className="ace-icon fa fa-chevron-down" />
                  )}
                </span>
              </div>
            </div>
            <Collapse isOpen={isOpenInfo} className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.businessLicence}
                        {' '}
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        id="add-business-licence"
                        label={Constants.MnMerchant.businessLicence}
                        onChange={this.onChangeBusinessLicence}
                        type="file"
                        accept="image/x-png,image/jpg,image/jpeg, .rar, .pdf"
                      />
                      {validateForm ? checkRequiredSelect(businessLicence.nameBusinessLicence, Constants.MnMerchant.businessLicence) : ''}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.domainLicence}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        onChange={this.onChangeDomainLicence}
                        type="file"
                        accept="image/x-png,image/jpg,image/jpeg, .rar, .pdf"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.identityCard}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        onChange={this.onChangeIdentityCard}
                        type="file"
                        accept="image/x-png,image/jpg,image/jpeg, .rar, .pdf"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.accountLicence}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        onChange={this.onChangeAccountLicence}
                        type="file"
                        accept="image/x-png,image/jpg,image/jpeg, .rar, .pdf"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        {Constants.MnMerchant.contractSign}
                      </Label>
                    </Col>
                    <Col lg="7">
                      <Input
                        onChange={this.onChangeContractSign}
                        type="file"
                        accept="image/x-png,image/jpg,image/jpeg, .rar, .pdf"
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // listDistrict: state.systemModule.listDistrict,
});

const mapDispatchToProps = (dispatch) => ({
  // getAllDistrictByProvince: (data) => dispatch(getAllDistrictByProvince(data)),
});

AttachmentDocs.defaultProps = {
  passDataAttachment: () => {},
};

AttachmentDocs.propTypes = {
  passDataAttachment: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AttachmentDocs));
