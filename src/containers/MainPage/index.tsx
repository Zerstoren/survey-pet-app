import React from 'react';
import BreadCrumbs from '../../components/global/Header/BreadCrumbs';
import NewSurveyButton from '../../components/global/Header/NewSurveyButton';
import Search from '../../components/global/Header/Search';
import AddNewSurvey from './AddNewSurvey';
import HocHeader from '../../components/hoc/header/header';
import Content from './Content';

const MainPage = () => {
  const hocHeader = HocHeader(
    <BreadCrumbs items={[]} />,
    <>
      <Search />
      <NewSurveyButton />
    </>
  )
  
  return (
    <>
      <AddNewSurvey />
      {hocHeader()}
      <Content />
    </>
  );
};

export default MainPage;