import React, { useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import './gameField.scss';
import Tile from './tile/tile';
import {
    GameStatuses, ITile, SmileStatuses, TileStatuses,
} from '../../models/models';
import { useAppDispatch, useAppSelector } from '../../hook';
import { removeFlagMinesCoordinates } from '../../store/slices/mineSlice';
import { updateGameStatus, updateSmileStatus } from '../../store/slices/gameSlice';

const GameField: React.FC = () => {
    const tileCount = useAppSelector((state) => state.game.tileCount);
    const flagCoordinates = useAppSelector((state) => state.mine.flagCoordinates);
    const questionCoordinates = useAppSelector((state) => state.mine.questionCoordinates);
    const gameStatus = useAppSelector((state) => state.game.gameStatus);
    const [tileArr, setTileArr] = useState<ITile[][]>([]);
    const [newRender, setNewRender] = useState<boolean>(false);
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

    const checkNeighbours = (neighbours: number, coordinates?: number[]): TileStatuses => {
        if (coordinates && compareMatrixArray(coordinates, flagCoordinates)) {
            dispatch(removeFlagMinesCoordinates(coordinates));
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
    };

    const waveGenerator = (coordinates: number[]) => {
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
    };

    const generateMineField = useMemo((ignore?: number[]) => {
        let count = 0;
        const arrColumns: ITile[][] = [];
        while (count < 40) {
            for (let i = 0; i < 16; i++) {
                const arrRows: ITile[] = [];
                for (let j = 0; j < 16; j++) {
                    if (Math.round(Math.random() * (5 - 1) + 1) === 5
                        && count < 40
                        && !compareTwoArray([i, j], ignore)) {
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
                            pressedTile: compareTwoArray([i, j], ignore),
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
                            pressedTile: compareTwoArray([i, j], ignore),
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
    }, [flagCoordinates, questionCoordinates]);

    useEffect(() => {
        if (gameStatus === GameStatuses.Restart) {
            dispatch(updateGameStatus(GameStatuses.Idle));
            dispatch(updateSmileStatus(SmileStatuses.Smile));
            setIgnoreCoordinates([]);
            setNewRender((prevState) => !prevState);
        }
        if (gameStatus === GameStatuses.Win) {
            dispatch(updateSmileStatus(SmileStatuses.Cool));
        }
    }, [dispatch, gameStatus]);

    useEffect(() => {
        if (tileCount === 216) {
            dispatch(updateGameStatus(GameStatuses.Win));
        }
    }, [dispatch, tileCount]);

    useEffect(() => {
        setTileArr(generateMineField);
    }, [generateMineField]);

    return (
        <div className="app__content-down">
            {tileArr.map((item) => {
                return item.map((item) => {
                    return (
                        <Tile
                            status={item.status}
                            neighbours={item.neighbours}
                            key={v4()}
                            generator={(coordinates) => {
                                setIgnoreCoordinates(coordinates);
                                setNewRender((prevState) => !prevState);
                            }}
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

export default GameField;
