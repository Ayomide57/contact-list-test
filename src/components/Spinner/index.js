import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import './spinner.scss';

const CustomSpinner = () => {
    return (
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden"></span>
      </Spinner>
    );
}

export default CustomSpinner;