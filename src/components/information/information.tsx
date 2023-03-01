import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../hook';
import Smile from '../smile/smile';
import Counter from '../counter/counter';
import './information.scss';


const Information: React.FC = () => {

    return (
        <div className="app__content-top">
            <div className="app__content-top-left">
                <Counter count={11}/>
            </div>
            <div className="app__content-top-smile">
                <Smile/>
            </div>
            <div className="app__content-top-right">
                <Counter count={9}/>
            </div>
        </div>
    );
}

export default Information;