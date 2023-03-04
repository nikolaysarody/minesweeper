import React, {useEffect, useRef, useState} from 'react';
import {GameStatuses, ITileItem, SmileStatuses, TileStatuses} from '../../../models/models';
import './tile.scss';
import {useAppDispatch, useAppSelector} from '../../../hook';
import {
    addFlagMinesCoordinates,
    addQuestionMinesCoordinates,
    removeFlagMinesCoordinates,
    removeQuestionMinesCoordinates,
    updateExplodedMineCoordinates,
    updateGameStatus,
    updateSmileStatus
} from '../../../store/slices/mineSlice';

const Tile: React.FC<ITileItem> = ({
                                       status,
                                       neighbours,
                                       generator,
                                       tileCoordinates,
                                       pressedTile,
                                       borderTile,
                                       waveGenerator,
                                       renderCount = 0,
                                       flag,
                                       question
                                   }) => {
    const gameStatus = useAppSelector(state => state.mine.gameStatus);
    const explodedTile = useAppSelector(state => state.mine.explodedMineCoordinates);
    const flagCoordinates = useAppSelector(state => state.mine.flagMinesCoordinates);
    const questionCoordinates = useAppSelector(state => state.mine.questionMinesCoordinates);
    const [tileStatus, setTileStatus] = useState<TileStatuses>(() => {
        if (borderTile) {
            return status;
        } else if (flagCoordinates.includes(tileCoordinates) || flag) {
            return TileStatuses.TileFlag;
        } else if (questionCoordinates.includes(tileCoordinates) || question) {
            return TileStatuses.TileQuestion;
        }else if (status === TileStatuses.TileMine) {
            return TileStatuses.TileMine;
        }else {
            return TileStatuses.TileDefault;
        }
    });
    const tileContainer = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const checkNeighbours = () => {
        // if (tileStatus !== TileStatuses.TileQuestion && tileStatus !== TileStatuses.TileFlag && tileStatus !== TileStatuses.TileQuestionPressed) {
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
        // }
    }

    const checkTileStatus = () => {
        if (status !== TileStatuses.TileMine) {
            dispatch(updateGameStatus(GameStatuses.Begin));
            if (renderCount && neighbours) {
                console.log('neighbours')
                checkNeighbours();
            } else {
                console.log('wave', neighbours, renderCount)
                waveGenerator(tileCoordinates, tileStatus);
            }
        } else if (gameStatus !== GameStatuses.Begin) {
            console.log('rerender')
            generator(tileCoordinates);
        } else {
            dispatch(updateGameStatus(GameStatuses.End));
            dispatch(updateExplodedMineCoordinates(tileCoordinates));
            dispatch(updateSmileStatus(SmileStatuses.Dead));
        }
    }

    useEffect(() => {
        if (flagCoordinates.includes(tileCoordinates)) {
            setTileStatus(TileStatuses.TileFlag);
        }
        if (tileContainer.current) {
            tileContainer.current.ondragstart = () => false;
            tileContainer.current.oncontextmenu = () => false;
        }
    }, [tileContainer]);

    useEffect(() => {
        if (gameStatus === GameStatuses.Idle) {
            dispatch(updateSmileStatus(SmileStatuses.Smile));
        }
        if (gameStatus === GameStatuses.End) {
            if (status === TileStatuses.TileMine) {
                if (explodedTile !== tileCoordinates) {
                    if (!flagCoordinates.includes(tileCoordinates)) {
                        setTileStatus(status);
                    }
                } else {
                    setTileStatus(TileStatuses.TileMineExploded);
                }
            } else if (tileStatus === TileStatuses.TileFlag) {
                setTileStatus(TileStatuses.TileMineWrong);
            }
        }
    }, [gameStatus]);

    useEffect(() => {
        if (borderTile) {
            if (renderCount < 1) {
                waveGenerator(tileCoordinates, tileStatus);
            }
            checkNeighbours();
        }
        if (pressedTile && gameStatus !== GameStatuses.End) {
            if (gameStatus !== GameStatuses.Begin) {
                dispatch(updateGameStatus(GameStatuses.Begin));
            }
            if (status !== TileStatuses.TileMine) {
                if (renderCount < 1) {
                    waveGenerator(tileCoordinates, tileStatus);
                    checkNeighbours();
                }
            }
        }
    }, []);

    return (
        <div className="app__content-down-tile"
             onClick={() => {
                 if (gameStatus !== GameStatuses.End) {
                     checkTileStatus();
                 }
             }}
             onContextMenu={() => {
                 if (gameStatus !== GameStatuses.End && tileStatus !== TileStatuses.TileVoid) {
                     if (flagCoordinates.includes(tileCoordinates)) {
                         dispatch(removeFlagMinesCoordinates(tileCoordinates));
                         dispatch(addQuestionMinesCoordinates(tileCoordinates));
                         setTileStatus(TileStatuses.TileQuestion);
                     } else if (questionCoordinates.includes(tileCoordinates)) {
                         dispatch(removeQuestionMinesCoordinates(tileCoordinates));
                         setTileStatus(TileStatuses.TileDefault);
                     } else {
                         dispatch(addFlagMinesCoordinates(tileCoordinates));
                         setTileStatus(TileStatuses.TileFlag);
                     }
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