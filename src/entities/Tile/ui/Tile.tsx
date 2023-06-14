import {
    memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/hooks';
import { gameActions } from '../../../widgets/GameField/model/slice/gameSlice';
import { mineActions } from '../model/slice/mineSlice';
import { getFlagCoordinates } from '../model/selectors/getFlagCoordinates';
import { getExplodedMineCoordinates } from '../model/selectors/getExplodedMineCoordinations';
import { getQuestionCoordinates } from '../model/selectors/getQuestionCoordinates';
import { getGameStatus } from '../../../widgets/GameField/model/selectors/getGameStatus';
import { SmileStatuses } from '../../Smile/model/types';
import { GameStatuses } from '../../../widgets/GameField/model/types';
import { ITileItem, TileStatuses } from '../model/types';
import styles from './Tile.module.scss';

export const Tile = memo((props: ITileItem) => {
    const {
        status,
        neighbours,
        generator,
        tileCoordinates,
        pressedTile,
        borderTile,
        waveGenerator,
        renderCount = 0,
        flag,
        question,
    } = props;
    const gameStatus = useAppSelector(getGameStatus);
    const explodedTile = useAppSelector(getExplodedMineCoordinates);
    const flagCoordinates = useAppSelector(getFlagCoordinates);
    const questionCoordinates = useAppSelector(getQuestionCoordinates);
    const [tileStatus, setTileStatus] = useState<TileStatuses>(() => {
        if (borderTile) {
            return status;
        } if (flagCoordinates.find((item) => {
            return JSON.stringify(item) === JSON.stringify(tileCoordinates);
        }) || flag) {
            return TileStatuses.TileFlag;
        } if (questionCoordinates.find((item) => {
            return JSON.stringify(item) === JSON.stringify(tileCoordinates);
        }) || question) {
            return TileStatuses.TileQuestion;
        }
        return TileStatuses.TileDefault;
    });
    const tileContainer = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const checkNeighbours = useCallback(() => {
        dispatch(gameActions.updateTileCount());
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
            default:
                return TileStatuses.TileVoid;
            }
        });
    }, [dispatch, neighbours]);

    const checkTileStatus = () => {
        if (status !== TileStatuses.TileMine && tileStatus) {
            dispatch(gameActions.updateGameStatus(GameStatuses.Begin));
            if (renderCount && neighbours && tileStatus === TileStatuses.TileDefault) {
                checkNeighbours();
            } else if (tileStatus === TileStatuses.TileDefault) {
                waveGenerator(tileCoordinates, TileStatuses.TileDefault);
                checkNeighbours();
            }
        } else if (gameStatus !== GameStatuses.Begin) {
            generator(tileCoordinates);
        } else {
            dispatch(gameActions.updateGameStatus(GameStatuses.End));
            dispatch(mineActions.updateExplodedCoordinates(tileCoordinates));
            dispatch(gameActions.updateSmileStatus(SmileStatuses.Dead));
        }
    };

    useEffect(() => {
        if (tileContainer.current) {
            tileContainer.current.ondragstart = () => false;
            tileContainer.current.oncontextmenu = () => false;
        }
    }, [tileContainer]);

    useEffect(() => {
        if (flagCoordinates.find((item) => {
            return JSON.stringify(item) === JSON.stringify(tileCoordinates);
        })) {
            setTileStatus(TileStatuses.TileFlag);
        }
    }, [flagCoordinates, tileCoordinates]);

    useEffect(() => {
        if (gameStatus === GameStatuses.End) {
            if (status === TileStatuses.TileMine) {
                if (explodedTile !== tileCoordinates) {
                    if (!flagCoordinates.find((item) => {
                        return JSON.stringify(item) === JSON.stringify(tileCoordinates);
                    })) {
                        setTileStatus(TileStatuses.TileMine);
                    }
                } else {
                    setTileStatus(TileStatuses.TileMineExploded);
                }
            } else if (tileStatus === TileStatuses.TileFlag) {
                setTileStatus(TileStatuses.TileMineWrong);
            }
        }
    }, [
        explodedTile,
        flagCoordinates,
        gameStatus,
        status,
        tileCoordinates,
        tileStatus,
    ]);

    useEffect(() => {
        if (borderTile) {
            if (renderCount < 1 && !pressedTile) {
                waveGenerator(tileCoordinates, tileStatus);
                checkNeighbours();
            }
        }
        if (pressedTile && gameStatus !== GameStatuses.End && renderCount === 0) {
            if (gameStatus !== GameStatuses.Begin) {
                dispatch(gameActions.updateGameStatus(GameStatuses.Begin));
            }
            if (status !== TileStatuses.TileMine) {
                waveGenerator(tileCoordinates, tileStatus);
                checkNeighbours();
            }
        }
    }, [
        borderTile,
        checkNeighbours,
        dispatch,
        gameStatus,
        pressedTile,
        renderCount,
        status,
        tileCoordinates,
        tileStatus,
        waveGenerator,
    ]);

    return (
        <div
            className={styles.tile}
            onClick={() => {
                if (
                    gameStatus !== GameStatuses.End
                    && gameStatus !== GameStatuses.Win
                    && tileStatus !== TileStatuses.TileQuestion
                    && tileStatus !== TileStatuses.TileFlag
                ) {
                    checkTileStatus();
                }
            }}
            onContextMenu={() => {
                if (
                    gameStatus !== GameStatuses.End
                    && tileStatus !== TileStatuses.TileVoid
                    && gameStatus !== GameStatuses.Win
                ) {
                    if (tileStatus === TileStatuses.TileDefault
                        || tileStatus === TileStatuses.TileQuestion
                        || tileStatus === TileStatuses.TileFlag
                        || tileStatus === TileStatuses.TileMine
                    ) {
                        if (flagCoordinates.find((item) => {
                            return JSON.stringify(item) === JSON.stringify(tileCoordinates);
                        })) {
                            dispatch(mineActions.removeFlagCoordinates(tileCoordinates));
                            dispatch(mineActions.addQuestionCoordinates(tileCoordinates));
                            setTileStatus(TileStatuses.TileQuestion);
                        } else if (questionCoordinates.find((item) => {
                            return JSON.stringify(item) === JSON.stringify(tileCoordinates);
                        })) {
                            dispatch(mineActions.removeQuestionCoordinates(tileCoordinates));
                            setTileStatus(TileStatuses.TileDefault);
                        } else {
                            dispatch(mineActions.addFlagCoordinates(tileCoordinates));
                            setTileStatus(TileStatuses.TileFlag);
                        }
                    }
                }
            }}
            ref={tileContainer}
            onMouseDown={() => {
                if (gameStatus !== GameStatuses.End && gameStatus !== GameStatuses.Win) {
                    dispatch(gameActions.updateSmileStatus(SmileStatuses.Scary));
                }
                if (questionCoordinates.find((item) => {
                    return JSON.stringify(item) === JSON.stringify(tileCoordinates);
                })) {
                    setTileStatus(TileStatuses.TileQuestionPressed);
                }
            }}
            onMouseUp={() => {
                if (gameStatus !== GameStatuses.End && gameStatus !== GameStatuses.Win) {
                    dispatch(gameActions.updateSmileStatus(SmileStatuses.Smile));
                }
                if (questionCoordinates.find((item) => {
                    return JSON.stringify(item) === JSON.stringify(tileCoordinates);
                })) {
                    setTileStatus(TileStatuses.TileDefault);
                }
            }}
        >
            <img src={tileStatus as unknown as string} alt="" />
        </div>
    );
});
