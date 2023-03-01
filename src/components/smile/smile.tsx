import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from '../../hook';
import {SmileStatuses} from '../../models/models';
import './smile.scss';


const Smile: React.FC = () => {
    const smileStatus = useAppSelector(state => state.mine.smileStatus);
    const [display, setDisplay] = useState<SmileStatuses>(SmileStatuses.Smile);
    const smileContainer = useRef<HTMLDivElement>(null);

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
             onMouseDown={() => setDisplay(SmileStatuses.PressedSmile)}
             onMouseUp={() => setDisplay(smileStatus)}
             onMouseOut={() => setDisplay(smileStatus)}
             ref={smileContainer}>
            <img src={display} alt="0"/>
        </div>
    );
}

export default Smile;