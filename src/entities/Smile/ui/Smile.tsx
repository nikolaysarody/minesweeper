import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/hooks';
import { GameStatuses, SmileStatuses } from '../../Tile/model/types/types';
import { mineActions } from '../../Tile/model/slice/mineSlice';
import { gameActions } from '../../../widgets/GameField/model/slice/gameSlice';
import styles from './Smile.module.scss';

export const Smile: React.FC = () => {
    const smileStatus = useAppSelector((state) => state.game.smileStatus);
    const [display, setDisplay] = useState<SmileStatuses>(SmileStatuses.Smile);
    const smileContainer = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (smileContainer.current) {
            smileContainer.current.ondragstart = () => false;
        }
    }, [smileContainer]);

    useEffect(() => {
        setDisplay(smileStatus);
    }, [smileStatus]);

    return (
        <div
            className={styles.Smile}
            onClick={() => {
                dispatch(gameActions.updateGameStatus(GameStatuses.Restart));
                dispatch(mineActions.deleteFlagCoordinates());
                dispatch(mineActions.deleteQuestionCoordinates());
                dispatch(gameActions.deleteTileCount());
            }}
            onMouseDown={() => (
                smileStatus === SmileStatuses.Smile && setDisplay(SmileStatuses.PressedSmile)
            )}
            onMouseUp={() => setDisplay(smileStatus)}
            onMouseOut={() => setDisplay(smileStatus)}
            ref={smileContainer}
        >
            <img src={display} alt="0" />
        </div>
    );
};
