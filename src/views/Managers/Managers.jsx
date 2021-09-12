import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllManagers } from './actions';

function Managers() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getAllManagers()), []);
  useSelector((state) => state.managerReducer);
  return <div>Mahela</div>;
}

export default Managers;
