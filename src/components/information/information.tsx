import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hook';
import Smile from '../smile/smile';
import Counter from '../counter/counter';
import './information.scss';
import {updateTimer} from '../../store/slices/mineSlice';
import {GameStatuses} from '../../models/models';

const Information: React.FC = () => {
    const gameStatus = useAppSelector(state => state.mine.gameStatus);
    const timer = useAppSelector(state => state.mine.timer);
    const count = useAppSelector(state => state.mine.count);
    const [displayTimer, setDisplayTimer] = useState<number>(timer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (gameStatus === GameStatuses.Idle) {
            if (timer) {
                clearInterval(timer);
            }
            setDisplayTimer(0);
        }
        if (gameStatus === GameStatuses.Begin){
            const timer = setInterval(() => {
                setDisplayTimer((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameStatus]);



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