import React from 'react';

export default () => {
  return (
    <nav className="breadcrumbs d-flex justify-content-start align-items-center">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="#">Survey</a></li>
        <li className="breadcrumb-item active"><a href="#">Survey Item</a></li>
      </ol>
    </nav>
  )
}