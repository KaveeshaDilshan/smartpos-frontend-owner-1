import React from 'react';
import { withRouter } from 'react-router-dom';
import PrimarySearchAppBar from './PrimarySearchAppBar';

function Header(props) {
  return (
    <>
      <PrimarySearchAppBar search={props.search} setSearch={props.setSearch} />
    </>
  );
}

export default withRouter(Header);
