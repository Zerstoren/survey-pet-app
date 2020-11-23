import React from 'react';

const hocCreateWithNewItem = <T extends object>(WrappedElement: React.ComponentType<T>, itemInstanceCallback: Function) => {
  return () => {
    return <WrappedElement {...itemInstanceCallback()} />
  }
}

export default hocCreateWithNewItem;