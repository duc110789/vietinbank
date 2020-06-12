import React from 'react';
import {
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Card,
  Row, Button, CardFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Constants from '../Constants';
import MerchantInfo from './MerchantInfo';
import ListTerminal from './ListTerminal';
import {
  getMerchantDetail,
} from '../../../store/actions/masterMerchant/masterMerchant';

class MerchantDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPrint: true,
    };
  }

  componentDidMount() {
    const {
      getMerchantDetail,
    } = this.props;

    getMerchantDetail({
      merchantCode: JSON.parse(window.atob(localStorage.getItem('ID_MERCHANT_DETAIL'))),
      type: '0',
    });
  }

  static getDerivedStateFromProps(props) {
    const {
      merchantDetail,
    } = props;
    return {
      merchantDetail,
    };
  }

  handlePrint = () => {
    this.setState({
      isPrint: false,
    }, () => {
      window.print();
    });
    setTimeout(() => {
      window.close();
      this.setState({
        isPrint: true,
      });
    }, 100);
  };

  render() {
    const {
      merchantDetail,
      isPrint,
    } = this.state;
    const { history } = this.props;
    return (
      <div className="my-requests">
        <Card className="card-my-requests">
          <CardHeader>
            <Col xs="12">
              <FormGroup style={{ marginBottom: 0 }} row>
                <Col lg="12" style={{ paddingLeft: 0 }}>
                  <span className="text-bold">{Constants.MerchantDetail.titleUnitBusinessInfo}</span>
                </Col>
              </FormGroup>
            </Col>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12">
                { merchantDetail ? (
                  <MerchantInfo merchantDetail={merchantDetail} />
                ) : (
                  <MerchantInfo />
                )}
                <ListTerminal />
              </Col>
            </Row>
          </CardBody>
          { isPrint ? (
            <CardFooter>
              <Col md="12">
                <Row>
                  <Col className="text-center btn-search">
                    <div>
                      <Button onClick={history.goBack} onKeyPress={history.goBack} title="Về danh sách" className="btn bggrey bigger-150 mr-3 text-white">
                        <i className="fa fa-arrow-left mr-2" aria-hidden="true" />
                        {Constants.btnMerchant.comeBackList}
                      </Button>
                      <Button className="icon-search btn btn-primary btn btn-secondary mr-3" onClick={() => this.handlePrint()}>
                        {Constants.MerchantDetail.print}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </CardFooter>
          ) : null }
        </Card>
        { !isPrint ? (
          <div className="clearfix form-actions row">
            <div className="col-md-6 text-left">
              { merchantDetail ? `${merchantDetail.merchantSiteUser}` : ''}
            </div>
            <div className="col-md-6 text-right" id="printTime">
              { moment().format('DD/MM/YYYY') }
            </div>
          </div>
        ) : null }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  merchantDetail: state.masterMerchant.merchantDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantDetail: (data) => dispatch(getMerchantDetail(data)),
});

MerchantDetail.defaultProps = {
  getMerchantDetail: () => {},
};

MerchantDetail.propTypes = {
  getMerchantDetail: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MerchantDetail));
