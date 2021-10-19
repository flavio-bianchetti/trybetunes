import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SelectRoute from './component/SelectRoute';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <SelectRoute />
      </BrowserRouter>
    );
  }
}

export default App;
