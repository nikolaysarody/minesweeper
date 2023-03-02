import React, {useEffect, useRef, useState} from 'react';
import {TileStatuses} from '../../../models/models';
import './tile.scss';


interface ITileItem {
    // key: string
    status: TileStatuses,
    neighbours: number
}

const Tile: React.FC<ITileItem> = ({status, neighbours}) => {
    const [tileStatus, setTileStatus] = useState<TileStatuses>(status);
    const tileContainer = useRef<HTMLDivElement>(null);
    // console.log(neighbours)

    useEffect(() => {
        if (tileContainer.current) {
            tileContainer.current.ondragstart = () => false;
        }
    }, [tileContainer]);

    useEffect(() => {
        if (neighbours && tileStatus !== TileStatuses.TileMine){
            setTileStatus(() => {
                switch (neighbours) {
                    case 1: {
                        return TileStatuses.TileOne;
                    }
                    case 2: {
                        return TileStatuses.TileTwo;
                    }
                    case 3: {
                        return TileStatuses.TileThree;
                    }
                    case 4: {
                        return TileStatuses.TileFour;
                    }
                    case 5: {
                        return TileStatuses.TileFive;
                    }
                    case 6: {
                        return TileStatuses.TileSix;
                    }
                    case 7: {
                        return TileStatuses.TileSeven;
                    }
                    case 8: {
                        return TileStatuses.TileEight;
                    }
                    default: return TileStatuses.TileVoid;
                }
            });
        }
    },[])

    // useEffect(() => {
    //     console.log(tileStatus);
    // }, [tileStatus]);

    return (
        <div className="app__content-down-tile"
             // onClick={() => setTileStatus(status)}
             ref={tileContainer}>
            <img src={tileStatus} alt="tile"/>
        </div>
    );
}

export default Tile;