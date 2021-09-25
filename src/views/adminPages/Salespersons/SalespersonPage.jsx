import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Pagination } from '@material-ui/lab';
import Layout from '../../Layout';
import { getAllSalesperson } from './actions';
import SalespersonItem from './components/SalespersonItem';

function SalespersonPage() {
  const dispatch = useDispatch();
  const salespersons = useSelector(
    (state) => state.adminSalespersonReducer.salespersons
  );
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getAllSalesperson(page));
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <Row>
            {salespersons.map((salesperson) => {
              return (
                <Col
                  key={salesperson._id}
                  className="col-md-6 col-sm-12 col-lg-4"
                >
                  <SalespersonItem
                    id={salesperson._id}
                    firstName={salesperson.firstName}
                    lastName={salesperson?.lastName}
                    email={salesperson.email}
                    warehouse={salesperson?.warehouseId}
                    photo={salesperson?.photo}
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

export default SalespersonPage;
