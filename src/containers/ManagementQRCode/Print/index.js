import React, { Component } from 'react';

class ComponentToPrint extends Component {
  render() {
    const { qrcodePrint } = this.props;
    return (
      <div className="text-center container-qrcode pd-12-percent">
        <div id="qrcode-print" ref={qrcodePrint} />
      </div>
    );
  }
}

export default ComponentToPrint;
