import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/global/Header/BreadCrumbs';
import HocHeader from '../../components/hoc/header';
import SurveyItem from '../../stores/surveys/surveyItem';
import Content from './Content';

const View = () => {
  const { id }: { id: string } = useParams();
  
  const surveyItem = useMemo(() => {
    const surveyItem = SurveyItem.create({id: id});
    surveyItem.load();
    return surveyItem;
  }, [id]);
  
  const hocHeader = HocHeader(
    <BreadCrumbs items={[['', surveyItem.title]]} />,
    <></>
  );
  
  return (
    <>
      {hocHeader()}
      <Content item={surveyItem} />
    </>
  );
}

export default observer(View);