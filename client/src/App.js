import React, { Fragment } from 'react';
import './App.css';

//components
import InputVet from './components/InputVet';
import ListStock from './components/ListStock';

function App() {
  return (
    <Fragment>
      <div className='container'>
        <InputVet/>
        <ListStock/>
      </div>
    </Fragment>
  );
}

export default App;
