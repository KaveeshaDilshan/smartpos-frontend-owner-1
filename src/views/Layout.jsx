import React from 'react';
import { Col, Row } from 'reactstrap';
import Header from '../components/common/Header';
import SideBar from '../components/common/AdminLayout/SideBar';

function Layout(props) {
  return (
    <>
      <Header search={props.search} setSearch={props.setSearch} />
      <div className="container-fluid">
        <Row>
          <Col className="col-2">
            <SideBar />
          </Col>
          <Col className="col-10 layout"> {props.children}</Col>
        </Row>
      </div>
    </>
  );
}

export default Layout;
