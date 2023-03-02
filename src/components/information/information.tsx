import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hook';
import Smile from '../smile/smile';
import Counter from '../counter/counter';
import './information.scss';
import {updateTimer} from '../../store/slices/mineSlice';


const Information: React.FC = () => {
    const timer = useAppSelector(state => state.mine.timer);
    const count = useAppSelector(state => state.mine.count);
    const [displayTimer, setDisplayTimer] = useState<number>(timer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setInterval(() => {
            setDisplayTimer((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(updateTimer(displayTimer));
    }, [displayTimer, dispatch]);

    return (
        <div className="app__content-top">
            <Counter count={count} side={'left'} key={'left'}/>
            <Smile/>
            <Counter count={displayTimer} side={'right'} key={'right'}/>
        </div>
    );
}

export default Information;