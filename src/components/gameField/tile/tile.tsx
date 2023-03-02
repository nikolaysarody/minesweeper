import React, {useEffect, useRef, useState} from 'react';
import {TileStatuses} from '../../../models/models';
import './tile.scss';


interface ITile {
    // key: string
    status: TileStatuses
}

const Tile: React.FC<ITile> = ({status}) => {
    const [tileStatus, setTileStatus] = useState<TileStatuses>(status);
    const tileContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tileContainer.current) {
            tileContainer.current.ondragstart = () => false;
        }
    }, [tileContainer]);

    // useEffect(() => {
    //     console.log(tileStatus);
    // }, [tileStatus]);

    return (
        <div className="app__content-down-tile"
             onClick={() => setTileStatus(status)}
             ref={tileContainer}>
            <img src={tileStatus} alt="tile"/>
        </div>
    );
}

export default Tile;