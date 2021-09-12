import React from 'react';
import Header from '../components/common/Header';

function Layout(props) {
  return (
    <>
      <Header search={props.search} setSearch={props.setSearch} />
      {props.children}
    </>
  );
}

export default Layout;
