import React from 'react';
import './App.scss';
import Counter from './components/counter/counter';

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <div className="app__wrapper-outside">
          <div className="app__wrapper-inside">
            <div className="app__content-top">
              <Counter count={11}/>
            </div>
            <hr className="app__content-center"/>
            <div className="app__content-down">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
