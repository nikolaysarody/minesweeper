import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/hooks';
import { GameStatuses, SmileStatuses } from '../../shared/ui/Tile/types/types';
import './smile.scss';
import { mineActions } from '../../store/slices/mineSlice';
import { gameActions } from '../../store/slices/gameSlice';

const Smile: React.FC = () => {
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
            className="app__content-top-smile"
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

export default Smile;
