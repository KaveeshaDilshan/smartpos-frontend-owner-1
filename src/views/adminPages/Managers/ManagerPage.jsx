import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Pagination } from '@material-ui/lab';
import Layout from '../../Layout';
import { getAllManagers } from './actions';
import ManagerItem from './components/ManagerItem';

function ManagerPage() {
  const dispatch = useDispatch();
  const managers = useSelector((state) => state.managerReducer.managers);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getAllManagers(page));
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <Row>
            {managers.map((manager) => {
              return (
                <Col key={manager._id} className="col-md-6 col-sm-12 col-lg-4">
                  <ManagerItem
                    id={manager._id}
                    firstName={manager.firstName}
                    lastName={manager?.lastName}
                    email={manager.email}
                    warehouse={manager?.warehouseId}
                    photo={manager?.photo}
                  />
                </Col>
              );
            })}
            <Row>
              <Col className="col-lg-12 d-flex justify-content-center mt-5">
                <Pagination
                  count={10}
                  onChange={(e, p) => setPage(p)}
                  color="primary"
                />
              </Col>
            </Row>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default ManagerPage;
