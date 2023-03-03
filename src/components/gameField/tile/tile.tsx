import React, {useEffect, useRef, useState} from 'react';
import {GameStatuses, ITileItem, TileStatuses} from '../../../models/models';
import './tile.scss';
import {useAppDispatch, useAppSelector} from '../../../hook';
import {updateGameStatus} from '../../../store/slices/mineSlice';

const Tile: React.FC<ITileItem> = ({status, neighbours, generator, tileCoordinates, pressedTile}) => {
    const gameStatus = useAppSelector(state => state.mine.gameStatus);
    const [tileStatus, setTileStatus] = useState<TileStatuses>(TileStatuses.TileDefault);
    const tileContainer = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const checkNeighbours = () => {
        setTileStatus(() => {
            switch (neighbours) {
                case 0: {
                    return TileStatuses.TileVoid;
                }
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
                default:
                    return TileStatuses.TileVoid;
            }
        });
    }


    const checkTileStatus = () => {
        dispatch(updateGameStatus(GameStatuses.Begin));
        if (status === TileStatuses.TileMine) {
            if (gameStatus !== GameStatuses.Begin) {
                generator(tileCoordinates);
            } else {
                setTileStatus(TileStatuses.TileMine);
            }
        } else {
            checkNeighbours();
        }
    }

    useEffect(() => {
        if (tileContainer.current) {
            tileContainer.current.ondragstart = () => false;
        }
    }, [tileContainer]);

    useEffect(() => {
        if (pressedTile) {
            dispatch(updateGameStatus(GameStatuses.Begin));
            checkNeighbours();
        }
    }, []);

    return (
        <div className="app__content-down-tile"
             onClick={() => checkTileStatus()}
             ref={tileContainer}>
            <img src={tileStatus} alt="tile"/>
        </div>
    );
}

export default Tile;