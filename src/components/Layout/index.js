import React from 'react';
import "./layout.scss";
import Header from '../Header/Header';


const Layout = ({children}) => {
    return (
      <div className="container">
        <Header />
        <div className="main">{children}</div>
      </div>
    );
}

export default Layout;