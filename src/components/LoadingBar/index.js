import React from 'react';

const LoadingBar = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return <span>... LOADING DATA ...</span>
};

export default LoadingBar;
