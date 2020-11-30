import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { IMainStore } from '../../../stores/mainState';

const Search = ({mainStore}: {mainStore?: IMainStore}) => {
  const [searchShow, setSearchShow] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    mainStore?.searchOnMainPage(e.target.value);
  }

  const onCancelSearch = () => {
    setSearchShow(false);
    setSearchText('');
    mainStore?.searchOnMainPage('');
  }

  return searchShow ? 
  (
    <div className="search">
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Search..." onChange={onChangeSearch} value={searchText} />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={onCancelSearch}>&#10005;</button>
        </div>
      </div>
    </div>
  ) : 
  (<div className="search" onClick={() => setSearchShow(!searchShow)}>&#128269;</div>);
}

export default inject('mainStore')(observer(Search));