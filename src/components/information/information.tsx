import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/hooks';
import Smile from '../smile/smile';
import Counter, { CounterSides } from '../../app/entities/counter/ui/counter';
import { GameStatuses } from '../../shared/ui/Tile/types/types';
import { gameActions } from '../../store/slices/gameSlice';
import './information.scss';

const Information: React.FC = () => {
    const gameStatus = useAppSelector((state) => state.game.gameStatus);
    const timer = useAppSelector((state) => state.game.timer);
    const count = useAppSelector((state) => state.mine.count);
    const [displayTimer, setDisplayTimer] = useState<number>(timer);
    const intervalRef = useRef<number | null>(null);

    const dispatch = useAppDispatch();

    // const startInterval = () => {
    //     if (intervalRef.current !== null) return;
    //     if (gameStatus === GameStatuses.Begin) {
    //         intervalRef.current = window.setInterval(() => {
    //             setDisplayTimer((prev) => prev + 1);
    //         }, 1000);
    //     }
    // };
    //
    // const stopInterval = () => {
    //     if (intervalref.current) {
    //         window.clearInterval(intervalref.current);
    //         intervalref.current = null;
    //     }
    // };

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
        <div className="app__content-top">
            <Counter count={count} side={CounterSides.left} key={CounterSides.left} />
            <Smile />
            <Counter count={displayTimer} side={CounterSides.right} key={CounterSides.right} />
        </div>
    );
};

export default Information;
