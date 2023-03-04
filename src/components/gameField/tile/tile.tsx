import React, {useEffect, useRef, useState} from 'react';
import {GameStatuses, ITileItem, SmileStatuses, TileStatuses} from '../../../models/models';
import './tile.scss';
import {useAppDispatch, useAppSelector} from '../../../hook';
import {updateExplodedMineCoordinates, updateGameStatus, updateSmileStatus} from '../../../store/slices/mineSlice';

const Tile: React.FC<ITileItem> = ({
                                       status,
                                       neighbours,
                                       generator,
                                       tileCoordinates,
                                       pressedTile,
                                       borderTile,
                                       waveGenerator,
                                       renderCount = 0
                                   }) => {
    const gameStatus = useAppSelector(state => state.mine.gameStatus);
    const explodedTile = useAppSelector(state => state.mine.explodedMineCoordinates);
    const [tileStatus, setTileStatus] = useState<TileStatuses>(borderTile ? status : TileStatuses.TileDefault);
    const tileContainer = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const checkNeighbours = () => {
        setTileStatus(() => {
            switch (neighbours) {
                case 1:
                    return TileStatuses.TileOne;
                case 2:
                    return TileStatuses.TileTwo;
                case 3:
                    return TileStatuses.TileThree;
                case 4:
                    return TileStatuses.TileFour;
                case 5:
                    return TileStatuses.TileFive;
                case 6:
                    return TileStatuses.TileSix;
                case 7:
                    return TileStatuses.TileSeven;
                case 8:
                    return TileStatuses.TileEight;
                default: {
                    return TileStatuses.TileVoid;
                }
            }
        });
    }

    const checkTileStatus = () => {
        if (gameStatus !== GameStatuses.Begin) {
            dispatch(updateGameStatus(GameStatuses.Begin));
        }
        if (status !== TileStatuses.TileMine) {
            waveGenerator(tileCoordinates);
            checkNeighbours();
        } else if (gameStatus !== GameStatuses.Begin) {
            generator(tileCoordinates);
        } else {
            dispatch(updateGameStatus(GameStatuses.End));
            dispatch(updateExplodedMineCoordinates(tileCoordinates));
            dispatch(updateSmileStatus(SmileStatuses.Dead));
            // setTileStatus(TileStatuses.TileMineExploded);
        }
    }

    useEffect(() => {
        if (tileContainer.current) {
            tileContainer.current.ondragstart = () => false;
        }
    }, [tileContainer]);

    useEffect(() => {
        if (gameStatus === GameStatuses.End && status === TileStatuses.TileMine) {
            if(explodedTile !== tileCoordinates) {
                setTileStatus(status);
            } else {
                setTileStatus(TileStatuses.TileMineExploded);
            }
        }
    }, [gameStatus]);

    useEffect(() => {
        if (borderTile) {
            if (renderCount < 1) {
                waveGenerator(tileCoordinates);
            }
            checkNeighbours();
        }
        if (pressedTile) {
            dispatch(updateGameStatus(GameStatuses.Begin));
            checkNeighbours();
        }
    }, []);

    return (
        <div className="app__content-down-tile"
             onClick={() => {
                 if (gameStatus !== GameStatuses.End){
                     return checkTileStatus();
                 }
             }}
             ref={tileContainer}
             onMouseDown={() => gameStatus !== GameStatuses.End ? dispatch(updateSmileStatus(SmileStatuses.Scary)) : null}
             onMouseUp={() => gameStatus !== GameStatuses.End ? dispatch(updateSmileStatus(SmileStatuses.Smile)) : null}>
            <img src={tileStatus} alt=""/>
        </div>
    );
}

export default Tile;