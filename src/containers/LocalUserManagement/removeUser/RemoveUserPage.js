import React from 'react';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row,} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class AddUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <Row>
        <div className="col-md-12">
          <div className="widget-box transparent">
            <div
              className="widget-header widget-header-flat"
              role="presentation"
              onClick={this.handOpenInfo}
              onKeyPress={this.handOpenInfo}
            >
              <span className="text-bold">Thêm mới tài khoản</span>
              <div className="widget-toolbar" />
            </div>
            <Collapse isOpen className="show-information">
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Tên đăng nhập
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>tamnd</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Họ và tên

                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>Ten la day</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Email:
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>ngochai@vnpay.vn</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Số điện thoại
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>123456666</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Chi nhánh trực thuộc
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>22 Lang ha</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Phạm vi dữ liệu
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>22 láng hạ hà nội, cơ sở chính</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Trạng thái
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>Hoạt động</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Phân quyền
                        {' '}
                        *
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>Admin</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Ngày tạo
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>12.2.2222</span></div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col lg="5">
                      <Label>
                        Ngày cập nhật
                      </Label>
                    </Col>
                    <Col lg="7">
                      <div><span>07.01.1996</span></div>
                    </Col>
                  </FormGroup>


                  <Col xs="12" style={{ textAlign: 'center' }}>
                    <Button
                      color="primary"
                      className="px-4"
                      onClick={this.updateChangeInfo}
                      style={{ marginRight: '20px' }}
                    >
                      Xóa
                    </Button>
                    <Button color="secondary" className="px-4">Bỏ qua</Button>
                  </Col>
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

AddUserPage.defaultProps = {
  // getAllDistrictByProvince: () => {},

};

AddUserPage.propTypes = {
  // getAllDistrictByProvince: PropTypes.func,

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddUserPage));
