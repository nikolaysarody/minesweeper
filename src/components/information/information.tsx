import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import Smile from '../smile/smile';
import Counter from '../counter/counter';
import './information.scss';
import { GameStatuses } from '../../models/models';
import { updateTimer } from '../../store/slices/gameSlice';

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
        dispatch(updateTimer(displayTimer));
    }, [displayTimer, dispatch]);

    return (
        <div className="app__content-top">
            <Counter count={count} side="left" key="left" />
            <Smile />
            <Counter count={displayTimer} side="right" key="right" />
        </div>
    );
};

export default Information;
