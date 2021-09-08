import React from 'react';
import { Container, Col, Row } from 'reactstrap';

function Home() {
  return (
    <>
      <Container>
        <Row>
          <Col className="col-3">
            <div>Mahela</div>
          </Col>
          <Col className="col-3">
            <div>Pradeep</div>
          </Col>
          <Col className="col-3">
            <div>Pradeep</div>
          </Col>
          <Col className="col-3">
            <div>Pradeep</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
