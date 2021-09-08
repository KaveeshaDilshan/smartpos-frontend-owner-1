import React from 'react';
import Header from '../components/common/Header';

function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}

export default Layout;
