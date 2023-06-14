import React, {
    useCallback, useEffect, useMemo, useState,
} from 'react';
import { Tile } from '../../../entities/Tile';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/hooks';
import { mineActions } from '../../../entities/Tile/model/slice/mineSlice';
import { gameActions } from '../model/slice/gameSlice';
import { getFlagCoordinates } from '../../../entities/Tile/model/selectors/getFlagCoordinates';
import { getQuestionCoordinates } from '../../../entities/Tile/model/selectors/getQuestionCoordinates';
import { getTileCount } from '../model/selectors/getTileCount';
import { getGameStatus } from '../model/selectors/getGameStatus';
import { SmileStatuses } from '../../../entities/Smile/model/types';
import { GameStatuses } from '../model/types';
import { ITile, TileStatuses } from '../../../entities/Tile/model/types';
import styles from './GameField.module.scss';

export const GameField = () => {
    const tileCount = useAppSelector(getTileCount);
    const flagCoordinates = useAppSelector(getFlagCoordinates);
    const questionCoordinates = useAppSelector(getQuestionCoordinates);
    const gameStatus = useAppSelector(getGameStatus);
    const [tileArr, setTileArr] = useState<ITile[][]>([]);
    const [ignoreCoordinates, setIgnoreCoordinates] = useState<number[]>([]);
    const dispatch = useAppDispatch();

    const compareTwoArray = (a1: number[], a2: number[] = []) => {
        return a1.toString() === a2.toString();
    };
    const compareMatrixArray = (arr: number[], matrix: number[][] = []) => {
        return matrix.some((array) => {
            return arr.toString() === array.toString();
        });
    };

    const checkNeighbours = useCallback((neighbours: number, coordinates?: number[]): TileStatuses => {
        if (coordinates && compareMatrixArray(coordinates, flagCoordinates)) {
            dispatch(mineActions.removeFlagCoordinates(coordinates));
        }
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
    }, [dispatch, flagCoordinates]);

    const waveGenerator = useCallback((coordinates: number[]) => {
        const newArr = tileArr.slice();
        const i = coordinates[0];
        const j = coordinates[1];
        const item = newArr[i][j];
        item.status = checkNeighbours(newArr[i][j].neighbours, coordinates);
        item.borderTile = true;
        item.renderCount = item.renderCount ? item.renderCount + 1 : 1;
        if (item.status === TileStatuses.TileVoid) {
            if (j > 0) {
                newArr[i][j - 1].borderTile = true;
                newArr[i][j - 1].status = checkNeighbours(newArr[i][j - 1].neighbours);
            }
            if (newArr[i - 1]) {
                if (newArr[i - 1][j]) {
                    newArr[i - 1][j].borderTile = true;
                    newArr[i - 1][j].status = checkNeighbours(newArr[i - 1][j].neighbours);
                }
                if (newArr[i - 1][j - 1]) {
                    newArr[i - 1][j - 1].borderTile = true;
                    newArr[i - 1][j - 1].status = checkNeighbours(newArr[i - 1][j - 1].neighbours);
                }
                if (newArr[i - 1][j + 1]) {
                    newArr[i - 1][j + 1].borderTile = true;
                    newArr[i - 1][j + 1].status = checkNeighbours(newArr[i - 1][j + 1].neighbours);
                }
            }
            if (newArr[i] && newArr[i][j + 1]) {
                newArr[i][j + 1].borderTile = true;
                newArr[i][j + 1].status = checkNeighbours(newArr[i][j + 1].neighbours);
            }
            if (newArr[i + 1]) {
                if (newArr[i + 1][j]) {
                    newArr[i + 1][j].borderTile = true;
                    newArr[i + 1][j].status = checkNeighbours(newArr[i + 1][j].neighbours);
                }
                if (newArr[i + 1][j - 1]) {
                    newArr[i + 1][j - 1].borderTile = true;
                    newArr[i + 1][j - 1].status = checkNeighbours(newArr[i + 1][j - 1].neighbours);
                }
                if (newArr[i + 1][j + 1]) {
                    newArr[i + 1][j + 1].borderTile = true;
                    newArr[i + 1][j + 1].status = checkNeighbours(newArr[i + 1][j + 1].neighbours);
                }
            }
        }
        setTileArr(newArr);
    }, [checkNeighbours, tileArr]);

    const generateMineField = useMemo(() => {
        let count = 0;
        const arrColumns: ITile[][] = [];
        while (count < 40) {
            for (let i = 0; i < 16; i++) {
                const arrRows: ITile[] = [];
                for (let j = 0; j < 16; j++) {
                    if (Math.round(Math.random() * (5 - 1) + 1) === 5
                        && count < 40
                        && !compareTwoArray([i, j], ignoreCoordinates)) {
                        arrRows[j] = {
                            status: TileStatuses.TileMine,
                            neighbours: 0,
                            tileCoordinates: [i, j],
                            pressedTile: false,
                            flag: compareMatrixArray([i, j], flagCoordinates),
                            question: compareMatrixArray([i, j], questionCoordinates),
                        };
                        if (!arrColumns[i]) {
                            count++;
                        } else if (
                            arrColumns[i][j]
                            && arrColumns[i][j].status !== TileStatuses.TileMine
                        ) {
                            count++;
                        }
                    } else if (!arrColumns[i]) {
                        arrRows[j] = {
                            status: TileStatuses.TileVoid,
                            neighbours: 0,
                            tileCoordinates: [i, j],
                            pressedTile: compareTwoArray([i, j], ignoreCoordinates),
                            flag: compareMatrixArray([i, j], flagCoordinates),
                            question: compareMatrixArray([i, j], questionCoordinates),
                        };
                    } else if (
                        arrColumns[i][j]
                        && arrColumns[i][j].status === TileStatuses.TileMine
                    ) {
                        arrRows[j] = {
                            status: TileStatuses.TileMine,
                            neighbours: 0,
                            tileCoordinates: [i, j],
                            pressedTile: false,
                            flag: compareMatrixArray([i, j], flagCoordinates),
                            question: compareMatrixArray([i, j], questionCoordinates),
                        };
                    } else {
                        arrRows[j] = {
                            status: TileStatuses.TileVoid,
                            neighbours: arrColumns[i][j].neighbours,
                            tileCoordinates: [i, j],
                            pressedTile: compareTwoArray([i, j], ignoreCoordinates),
                            flag: compareMatrixArray([i, j], flagCoordinates),
                            question: compareMatrixArray([i, j], questionCoordinates),
                        };
                    }
                }
                arrColumns[i] = arrRows;
            }
        }
        arrColumns.forEach((array, i) => {
            array.forEach((item, j) => {
                if (item.status === TileStatuses.TileMine) {
                    item.neighbours = 0;
                    if (j > 0) {
                        array[j - 1].neighbours = array[j - 1].neighbours + 1;
                    }
                    if (arrColumns[i - 1]) {
                        if (arrColumns[i - 1][j] && !arrColumns[i - 1][j].renderCount) {
                            arrColumns[i - 1][j].neighbours = arrColumns[i - 1][j].neighbours + 1;
                        }
                        if (arrColumns[i - 1][j - 1]
                            && !arrColumns[i - 1][j - 1].renderCount
                        ) {
                            arrColumns[i - 1][j - 1].neighbours = arrColumns[i - 1][j - 1].neighbours + 1;
                        }
                        if (arrColumns[i - 1][j + 1] && !arrColumns[i - 1][j + 1].renderCount) {
                            arrColumns[i - 1][j + 1].neighbours = arrColumns[i - 1][j + 1].neighbours + 1;
                        }
                    }
                    if (arrColumns[i] && arrColumns[i][j + 1] && !arrColumns[i][j + 1].renderCount) {
                        array[j + 1].neighbours = array[j + 1].neighbours + 1;
                    }
                    if (arrColumns[i + 1]) {
                        if (arrColumns[i + 1][j] && !arrColumns[i + 1][j].renderCount) {
                            arrColumns[i + 1][j].neighbours = arrColumns[i + 1][j].neighbours + 1;
                        }
                        if (arrColumns[i + 1][j - 1] && !arrColumns[i + 1][j - 1].renderCount) {
                            arrColumns[i + 1][j - 1].neighbours = arrColumns[i + 1][j - 1].neighbours + 1;
                        }
                        if (arrColumns[i + 1][j + 1] && !arrColumns[i + 1][j + 1].renderCount) {
                            arrColumns[i + 1][j + 1].neighbours = arrColumns[i + 1][j + 1].neighbours + 1;
                        }
                    }
                }
            });
        });
        return arrColumns;
        // eslint-disable-next-line
    }, [ignoreCoordinates]);

    useEffect(() => {
        if (gameStatus === GameStatuses.Restart) {
            dispatch(gameActions.updateGameStatus(GameStatuses.Idle));
            dispatch(gameActions.updateSmileStatus(SmileStatuses.Smile));
            setIgnoreCoordinates([]);
            setTileArr([]);
        }
        if (gameStatus === GameStatuses.Win) {
            dispatch(gameActions.updateSmileStatus(SmileStatuses.Cool));
        }
    }, [dispatch, gameStatus]);

    useEffect(() => {
        if (tileCount === 216) {
            dispatch(gameActions.updateGameStatus(GameStatuses.Win));
        }
    }, [dispatch, tileCount]);

    useEffect(() => {
        setTileArr(generateMineField);
    }, [generateMineField]);

    return (
        <div className={styles.GameField}>
            {tileArr.map((item) => {
                return item.map((item) => {
                    return (
                        <Tile
                            status={item.status}
                            neighbours={item.neighbours}
                            key={JSON.stringify(item.tileCoordinates)}
                            generator={setIgnoreCoordinates}
                            tileCoordinates={item.tileCoordinates}
                            pressedTile={item.pressedTile}
                            borderTile={item.borderTile}
                            waveGenerator={waveGenerator}
                            renderCount={item.renderCount}
                            flag={item.flag}
                            question={item.question}
                        />
                    );
                });
            })}
        </div>
    );
};
