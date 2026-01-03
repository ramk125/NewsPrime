import React, { Component } from 'react';
import loading from './spinner.gif'; // Make sure the file exists here

export default class Spinner extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <img src={loading} alt="Loading..." />
      </div>
    );
  }
}
