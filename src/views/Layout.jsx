import React from 'react';
import Header from '../components/common/Header';

function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <h1>Mahela</h1>
    </>
  );
}

export default Layout;
