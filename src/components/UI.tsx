import React from 'react';

export const SplashScreen: React.FCC = () => {
  return <div>
    <h1>Loading...</h1>
  </div>;
};

export const FallbackUI: React.FCC = ()=> {
  return <div>
    <h1>Something went wrong</h1>
    <p>Please try again later.</p>
  </div>;
};