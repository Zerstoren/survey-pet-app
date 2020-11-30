import React from 'react';
import { Link } from 'react-router-dom';

interface IBreadCrumbItem extends Array<[string, string]>{}

const BreadCrumbs = ({items}: {items: IBreadCrumbItem}) => {
  let crumbsLink = [['/', 'Surveys']].concat(items);
  const lastIndex = crumbsLink.length - 1;
  
  const crumbs = crumbsLink.map((item, index) => {
    const [url, name] = item;
    const link = index === lastIndex ? <>{name}</> : <Link to={url}>{name}</Link>;
    const className = index === lastIndex ? 'breadcrumb-item active' : 'breadcrumb-item'
    
    return (<li key={index} className={className}>{link}</li>);
  });

  return (
    <nav className="breadcrumbs d-flex justify-content-start align-items-center">
      <ol className="breadcrumb">
        {crumbs}
      </ol>
    </nav>
  )
}

export default BreadCrumbs;