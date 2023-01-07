import React from 'react';
import { Nav } from 'react-bootstrap';

const Header = () => {
    return (
      <div>
        <header className="App-header">
          <Nav
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          >
            <Nav.Item>
              <h2>My Test Code</h2>
            </Nav.Item>
          </Nav>
        </header>
      </div>
    );
}

export default Header;