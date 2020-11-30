import { observer } from 'mobx-react';
import React from 'react';
import BreadCrumbs from '../../components/global/Header/BreadCrumbs';
import HocHeader from '../../components/hoc/header/header';

const View = () => {
  const hocHeader = HocHeader(
    <BreadCrumbs items={[['', 'Show']]} />,
    <></>
  );
  
  return (
    <>
      {hocHeader()}
    </>
  );
}

export default observer(View);