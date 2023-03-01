import React from 'react';
import './App.scss';
import Counter from './components/counter/counter';
import Smile from './components/smile/smile';
import Information from './components/information/information';

function App() {

  return (
    <div className="app">
      <div className="app__body">
        <div className="app__wrapper-outside">
          <div className="app__wrapper-inside">
            <Information/>
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
