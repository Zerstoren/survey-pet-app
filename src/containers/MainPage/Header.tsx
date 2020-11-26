import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import BreadCrumbs from './BreadCrumbs';
import { IMainStore } from '../../stores/mainState';

const Header = (props: any) => {
  const {mainStore}: {mainStore: IMainStore} = props;

  const [searchShow, setSearchShow] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const showPopupForAddSurvey = () => {
    mainStore.setIsShowAddSurveyPopup(!mainStore.isShowAddSurveyPopup);
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    mainStore.searchOnMainPage(e.target.value);
  }

  const onCancelSearch = () => {
    setSearchShow(false);
    setSearchText('');
    mainStore.searchOnMainPage('');
  }

  let searchBlock = null;
  if (searchShow) {
    searchBlock = (
      <div className="search">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search..." onChange={onChangeSearch} value={searchText} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={onCancelSearch}>&#10005;</button>
          </div>
        </div>
      </div>
    );
  } else {
    searchBlock = (<div className="search" onClick={() => setSearchShow(!searchShow)}>&#128269;</div>);
  }

  return (
    <div className="header d-flex justify-content-between align-items-center">
      <div className="left-side">
        <BreadCrumbs />
      </div>
      <div className="right-side d-flex justify-content-end align-items-center">
        {searchBlock}
        <div className="new-survey">
          <button className="btn btn-outline-primary" onClick={showPopupForAddSurvey}>New survey</button>
        </div>
      </div>
    </div>   
  )
};

export default inject("mainStore")(observer(Header));