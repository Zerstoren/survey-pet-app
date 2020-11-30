import { observer } from 'mobx-react';
import React from 'react';

const Header = ({
  leftSideElement,
  rightSideElement,
}: {
  leftSideElement?: JSX.Element,
  rightSideElement?: JSX.Element
}) => (
  <div className="header d-flex justify-content-between align-items-center">
    <div className="left-side">
      {leftSideElement}
    </div>
    <div className="right-side d-flex justify-content-end align-items-center">
      {rightSideElement}
    </div>
  </div>   
);

export default observer(Header);