import React from 'react';
import { Col, Row } from 'reactstrap';
import Header from '../components/common/Header';
import ManagerSideBar from '../components/common/ManagerLayout/ManagerSidebar';

function ManagerLayout(props) {
  return (
    <>
      <Header
        search={props.search}
        setSearch={props.setSearch}
        isShow={props.isShow}
      />
      <div className="container-fluid">
        <Row>
          <Col className="col-2">
            <ManagerSideBar />
          </Col>
          <Col className="col-10 layout" style={{ minHeight: '88vh' }}>
            {props.children}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ManagerLayout;
