import React from 'react';
import Loader from "react-loader-spinner";

export default class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className='loading-spinner'>
        <Loader
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  }
}