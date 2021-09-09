import React from 'react';
import { withRouter } from 'react-router-dom';
import PrimarySearchAppBar from './PrimarySearchAppBar';

function Header() {
  return (
    <>
      <PrimarySearchAppBar />
    </>
  );
}

export default withRouter(Header);
