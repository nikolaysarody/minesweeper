import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hook';
import Smile from '../smile/smile';
import Counter from '../counter/counter';
import './information.scss';
import {GameStatuses} from '../../models/models';
import {updateTimer} from '../../store/slices/gameSlice';

const Information: React.FC = () => {
    const gameStatus = useAppSelector(state => state.game.gameStatus);
    const timer = useAppSelector(state => state.game.timer);
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