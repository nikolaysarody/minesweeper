import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/hooks';
import { Counter, CounterSides } from '../../../entities/Counter/ui/Counter';
import { GameStatuses } from '../../../entities/Tile/model/types/types';
import { gameActions } from '../../GameField/model/slice/gameSlice';
import { Smile } from '../../../entities/Smile';
import styles from './Information.module.scss';

export const Information: React.FC = () => {
    const gameStatus = useAppSelector((state) => state.game.gameStatus);
    const timer = useAppSelector((state) => state.game.timer);
    const count = useAppSelector((state) => state.mine.count);
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
