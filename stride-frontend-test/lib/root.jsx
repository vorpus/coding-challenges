import React from 'react';
import ReactDOM from 'react-dom';

import Storefront from './storefront';

class Root extends React.Component {
  render() {
    return (
      <div>
        <Storefront />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root />, document.getElementById('root'));
});
