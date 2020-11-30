import { observer } from 'mobx-react';
import React from 'react';
import BreadCrumbs from '../../components/global/Header/BreadCrumbs';
import NewSurveyButton from '../../components/global/Header/NewSurveyButton';
import Search from '../../components/global/Header/Search';
import HocHeader from '../../components/hoc/header/header';

const View = () => {
  const hocHeader = HocHeader(
    <BreadCrumbs items={[['', 'Show']]} />,
    <>
      <Search />
      <NewSurveyButton />
    </>
  );
  
  return (
    <>
      {hocHeader()}
    </>
  );
}

export default observer(View);