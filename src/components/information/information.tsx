import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hook';
import Smile from '../smile/smile';
import Counter from '../counter/counter';
import './information.scss';
import {updateTimer} from '../../store/slices/mineSlice';


const Information: React.FC = () => {
    const timer = useAppSelector(state => state.mine.timer);
    const [displayTimer, setDisplayTimer] = useState<number>(timer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setInterval(() => {
            setDisplayTimer((prev) =>  prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(updateTimer(displayTimer));
    }, [displayTimer]);

    return (
        <div className="app__content-top">
            <div className="app__content-top-left">
                <Counter count={11}/>
            </div>
            <div className="app__content-top-smile">
                <Smile/>
            </div>
            <div className="app__content-top-right">
                <Counter count={displayTimer}/>
            </div>
        </div>
    );
}

export default Information;