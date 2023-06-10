import React from 'react';
import Information from '../components/information/information';
import GameField from '../components/gameField/gameField';
import './styles/index.scss';

function App() {
    return (
        <div className="app">
            <div className="app__body">
                <div className="app__wrapper-outside">
                    <div className="app__wrapper-inside">
                        <Information />
                        <hr className="app__content-center" />
                        <GameField />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
