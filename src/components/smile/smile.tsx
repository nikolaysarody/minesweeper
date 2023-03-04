import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hook';
import {GameStatuses, SmileStatuses} from '../../models/models';
import './smile.scss';
import {updateGameStatus} from '../../store/slices/mineSlice';


const Smile: React.FC = () => {
    // const gameStatus = useAppSelector(state => state.mine.gameStatus);
    const smileStatus = useAppSelector(state => state.mine.smileStatus);
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
        <div className="app__content-top-smile"
             onClick={() => dispatch(updateGameStatus(GameStatuses.Restart))}
             onMouseDown={() => smileStatus === SmileStatuses.Smile ? setDisplay(SmileStatuses.PressedSmile) : null}
             onMouseUp={() => setDisplay(smileStatus)}
             onMouseOut={() => setDisplay(smileStatus)}
             ref={smileContainer}>
            <img src={display} alt="0"/>
        </div>
    );
}

export default Smile;