import React, {
    useEffect, useRef, useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/hooks';
import { Counter } from '../../../entities/Counter';
import { gameActions } from '../../GameField/model/slice/gameSlice';
import { Smile } from '../../../entities/Smile';
import { GameStatuses } from '../../GameField/model/types';
import { getGameStatus } from '../../GameField/model/selectors/getGameStatus';
import { getGameTimer } from '../../GameField/model/selectors/getGameTimer';
import { getMineCount } from '../../../entities/Tile/model/selectors/getMineCount';
import { CounterSides } from '../../../entities/Counter/model/types';
import styles from './Information.module.scss';

export const Information = () => {
    const gameStatus = useAppSelector(getGameStatus);
    const timer = useAppSelector(getGameTimer);
    const count = useAppSelector(getMineCount);
    const [displayTimer, setDisplayTimer] = useState<number>(timer);
    const intervalRef = useRef<number | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (gameStatus === GameStatuses.Idle) {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
            setDisplayTimer(0);
        }
        if (gameStatus === GameStatuses.Begin) {
            intervalRef.current = window.setInterval(() => {
                setDisplayTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (intervalRef.current !== null) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, [gameStatus]);

    useEffect(() => {
        dispatch(gameActions.updateTimer(displayTimer));
    }, [displayTimer, dispatch]);

    return (
        <div className={styles.Information}>
            <Counter count={count} side={CounterSides.left} key={CounterSides.left} />
            <Smile />
            <Counter count={displayTimer} side={CounterSides.right} key={CounterSides.right} />
        </div>
    );
};
