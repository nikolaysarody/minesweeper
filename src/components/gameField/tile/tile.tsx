import React, {useEffect, useRef, useState} from 'react';
import {TileStatuses} from '../../../models/models';
import './tile.scss';


interface ITile {
    key: string
}

const Tile: React.FC<ITile> = ({key}) => {
    const [tileStatus, setTileStatus] = useState<TileStatuses>(TileStatuses.TileDefault);
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
             key={key}
             onClick={() => setTileStatus(TileStatuses.TileVoid)}
             ref={tileContainer}>
            <img src={tileStatus} alt="tile"/>
        </div>
    );
}

export default Tile;