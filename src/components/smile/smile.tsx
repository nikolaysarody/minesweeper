import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../hook';
import {SmileStatuses} from '../../models/models';


const Smile: React.FC = () => {
    const smileStatus = useAppSelector(state => state.mine.smileStatus);
    const [display, setDisplay] = useState<SmileStatuses>(SmileStatuses.Smile);

    useEffect(() => {
        setDisplay(smileStatus);
    }, [smileStatus]);

    return (
        <img src={display} alt='0'/>
    );
}

export default Smile;