import React from 'react';
import Header from '../global/Header';

const HocHeader = (leftSide: JSX.Element, rightSide: JSX.Element) => {
  return () => (
    <Header leftSideElement={leftSide} rightSideElement={rightSide} />
  );
}

export default HocHeader;