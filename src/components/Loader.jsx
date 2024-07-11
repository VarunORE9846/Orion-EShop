import React from 'react';
import { Oval } from 'react-loader-spinner';
import '../App.css'; 

const Loader = () => {
  return (
    <div className="loader">
      <Oval
        height={80}
        width={80}
        color="dodgerblue"
        secondaryColor="cornsilk"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
