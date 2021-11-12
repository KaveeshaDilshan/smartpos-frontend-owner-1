import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import Layout from '../../Layout';
import { getSalespersonLeaderboard } from './actions';
import LeaderboardCard from './components/LeaderboardCard';

function AnalyticsPage() {
  const { salespersonLeaderboard } = useSelector(
    (state) => state.adminAnalyticsReducer
  );
  const dispatch = useDispatch();
  useEffect(() => dispatch(getSalespersonLeaderboard()), []);
  return (
    <>
      <Layout>
        <Container>
          <Row>
            <Col className="col-1" />
            <Col className="col-10">
              {salespersonLeaderboard.map((lead) => {
                return (
                  <LeaderboardCard
                    firstName={lead.firstName}
                    lastName={lead.lastName}
                    email={lead.email}
                    photo={lead.photo}
                    income={lead.income}
                    warehouse={lead.warehouseId}
                    id={lead._id}
                  />
                );
              })}
            </Col>
            <Col className="col-1" />
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default AnalyticsPage;
