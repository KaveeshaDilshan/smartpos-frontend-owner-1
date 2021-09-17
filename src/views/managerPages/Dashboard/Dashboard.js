import React from 'react';
// import { useHistory } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  // const history = useHistory();
  // const isRegistered = useSelector((state) => state.expertReducer.isRegistered);
  // useEffect(() => {
  //   if (isRegistered) {
  //     history.push("/register/expert-details");
  //   } else {
  //     history.push("/register/expert");
  //   }
  // }, []);
  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.test}>
          <h1>Dashboard</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
