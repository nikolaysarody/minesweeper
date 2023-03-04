import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import './gameField.scss';
import Tile from './tile/tile';
import {GameStatuses, ITile, SmileStatuses, TileStatuses} from '../../models/models';
import {useAppDispatch, useAppSelector} from '../../hook';
import {
    deleteMineCoordinates,
    removeFlagMinesCoordinates,
    updateMineCoordinates,
} from '../../store/slices/mineSlice';
import {updateGameStatus, updateSmileStatus} from '../../store/slices/gameSlice';

const GameField: React.FC = () => {
    const mineCount = useAppSelector(state => state.mine.count);
    const flagCoordinates = useAppSelector(state => state.mine.flagCoordinates);
    const questionCoordinates = useAppSelector(state => state.mine.questionCoordinates);
    const mineCoordinates = useAppSelector(state => state.mine.mineCoordinates);
    const gameStatus = useAppSelector(state => state.game.gameStatus);
    const [tileArr, setTileArr] = useState<ITile[][]>([]);
    const dispatch = useAppDispatch();

    const compareTwoArray = (a1: number[], a2: number[] = []) => {
        return a1.toString() === a2.toString();
    }
    const compareMatrixArray = (arr: number[], matrix: number[][] = []) => {
        return matrix.some((array) => {
            return arr.toString() === array.toString();
        });
    }
    const compareTwoMatrixArray = (matrix1: number[][], matrix2: number[][]) => {
        let count = 0;
        matrix1.forEach((item1) => {
            if (matrix2.some((item2) => {
                return compareTwoArray(item1, item2);
            })) {
                count = count + 1;
            }
        });
        return count;
    }

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
            default: {
                return TileStatuses.TileVoid;
            }
        }
    }

    const waveGenerator = (coordinates: number[]) => {
        const newArr = tileArr.slice();
        newArr.forEach((array, arrayIndex) => {
            array.forEach((item, itemIndex) => {
                if (arrayIndex === coordinates[0] && itemIndex === coordinates[1]) {
                    item.status = checkNeighbours(item.neighbours, coordinates);
                    item.borderTile = true;
                    item.renderCount = item.renderCount ? item.renderCount + 1 : 1;
                    if (item.status === TileStatuses.TileVoid) {
                        if (itemIndex > 0) {
                            array[itemIndex - 1].borderTile = true;
                            array[itemIndex - 1].status = checkNeighbours(array[itemIndex - 1].neighbours);
                        }
                        if (newArr[arrayIndex - 1]) {
                            if (newArr[arrayIndex - 1][itemIndex]) {
                                newArr[arrayIndex - 1][itemIndex].borderTile = true;
                                newArr[arrayIndex - 1][itemIndex].status = checkNeighbours(newArr[arrayIndex - 1][itemIndex].neighbours);
                            }
                            if (newArr[arrayIndex - 1][itemIndex - 1]) {
                                newArr[arrayIndex - 1][itemIndex - 1].borderTile = true;
                                newArr[arrayIndex - 1][itemIndex - 1].status = checkNeighbours(newArr[arrayIndex - 1][itemIndex - 1].neighbours);
                            }
                            if (newArr[arrayIndex - 1][itemIndex + 1]) {
                                newArr[arrayIndex - 1][itemIndex + 1].borderTile = true;
                                newArr[arrayIndex - 1][itemIndex + 1].status = checkNeighbours(newArr[arrayIndex - 1][itemIndex + 1].neighbours);
                            }
                        }
                        if (newArr[arrayIndex] && newArr[arrayIndex][itemIndex + 1]) {
                            array[itemIndex + 1].borderTile = true;
                            array[itemIndex + 1].status = checkNeighbours(array[itemIndex + 1].neighbours);
                        }
                        if (newArr[arrayIndex + 1]) {
                            if (newArr[arrayIndex + 1][itemIndex]) {
                                newArr[arrayIndex + 1][itemIndex].borderTile = true;
                                newArr[arrayIndex + 1][itemIndex].status = checkNeighbours(newArr[arrayIndex + 1][itemIndex].neighbours);
                            }
                            if (newArr[arrayIndex + 1][itemIndex - 1]) {
                                newArr[arrayIndex + 1][itemIndex - 1].borderTile = true;
                                newArr[arrayIndex + 1][itemIndex - 1].status = checkNeighbours(newArr[arrayIndex + 1][itemIndex - 1].neighbours);
                            }
                            if (newArr[arrayIndex + 1][itemIndex + 1]) {
                                newArr[arrayIndex + 1][itemIndex + 1].borderTile = true;
                                newArr[arrayIndex + 1][itemIndex + 1].status = checkNeighbours(newArr[arrayIndex + 1][itemIndex + 1].neighbours);
                            }
                        }
                    }
                }
            });
        });
        setTileArr(newArr);
    }

    const generateMineField = (ignore?: number[]) => {
        dispatch(deleteMineCoordinates());
        let count = 0;
        // let ss = 0;
        let cycleCount = 0;
        const arrColumns: ITile[][] = [];
        while (count < 40) {
            cycleCount = cycleCount + 1;
            for (let i = 0; i < 16; i++) {
                const arrRows: ITile[] = [];
                for (let j = 0; j < 16; j++) {
                    if (Math.round(Math.random() * (5 - 1) + 1) === 5 && count < 40 && !compareTwoArray([i, j], ignore)) {
                        arrRows[j] = {
                            status: TileStatuses.TileMine,
                            neighbours: 0,
                            tileCoordinates: [i, j],
                            pressedTile: false,
                            flag: compareMatrixArray([i, j], flagCoordinates),
                            question: compareMatrixArray([i, j], questionCoordinates)
                        }
                        if (!arrColumns[i]) {
                            count++;
                            dispatch(updateMineCoordinates([i, j]));
                        } else if (arrColumns[i][j] && arrColumns[i][j].status !== TileStatuses.TileMine) {
                            count++;
                            dispatch(updateMineCoordinates([i, j]));
                        }
                    } else {
                        if (!arrColumns[i]) {
                            arrRows[j] = {
                                status: TileStatuses.TileVoid,
                                neighbours: 0,
                                tileCoordinates: [i, j],
                                pressedTile: compareTwoArray([i, j], ignore),
                                flag: compareMatrixArray([i, j], flagCoordinates),
                                question: compareMatrixArray([i, j], questionCoordinates)
                            }
                        } else if (arrColumns[i][j] && arrColumns[i][j].status === TileStatuses.TileMine) {
                            arrRows[j] = {
                                status: TileStatuses.TileMine,
                                neighbours: 0,
                                tileCoordinates: [i, j],
                                pressedTile: false,
                                flag: compareMatrixArray([i, j], flagCoordinates),
                                question: compareMatrixArray([i, j], questionCoordinates)
                            }
                        } else {
                            arrRows[j] = {
                                status: TileStatuses.TileVoid,
                                neighbours: arrColumns[i][j].neighbours,
                                tileCoordinates: [i, j],
                                pressedTile: compareTwoArray([i, j], ignore),
                                flag: compareMatrixArray([i, j], flagCoordinates),
                                question: compareMatrixArray([i, j], questionCoordinates)
                            }
                        }
                    }
                }
                arrColumns[i] = arrRows;
            }
        }
        arrColumns.forEach((array, arrayIndex) => {
            array.forEach((item, itemIndex) => {
                if (item.status === TileStatuses.TileMine) {
                    item.neighbours = 0;
                    if (itemIndex > 0) {
                        array[itemIndex - 1].neighbours = array[itemIndex - 1].neighbours + 1;
                    }
                    if (arrColumns[arrayIndex - 1]) {
                        if (arrColumns[arrayIndex - 1][itemIndex]) {
                            arrColumns[arrayIndex - 1][itemIndex].neighbours = arrColumns[arrayIndex - 1][itemIndex].neighbours + 1;
                        }
                        if (arrColumns[arrayIndex - 1][itemIndex - 1]) {
                            arrColumns[arrayIndex - 1][itemIndex - 1].neighbours = arrColumns[arrayIndex - 1][itemIndex - 1].neighbours + 1;
                        }
                        if (arrColumns[arrayIndex - 1][itemIndex + 1]) {
                            arrColumns[arrayIndex - 1][itemIndex + 1].neighbours = arrColumns[arrayIndex - 1][itemIndex + 1].neighbours + 1;
                        }
                    }
                    if (arrColumns[arrayIndex] && arrColumns[arrayIndex][itemIndex + 1]) {
                        array[itemIndex + 1].neighbours = array[itemIndex + 1].neighbours + 1;
                    }
                    if (arrColumns[arrayIndex + 1]) {
                        if (arrColumns[arrayIndex + 1][itemIndex]) {
                            arrColumns[arrayIndex + 1][itemIndex].neighbours = arrColumns[arrayIndex + 1][itemIndex].neighbours + 1;
                        }
                        if (arrColumns[arrayIndex + 1][itemIndex - 1]) {
                            arrColumns[arrayIndex + 1][itemIndex - 1].neighbours = arrColumns[arrayIndex + 1][itemIndex - 1].neighbours + 1;
                        }
                        if (arrColumns[arrayIndex + 1][itemIndex + 1]) {
                            arrColumns[arrayIndex + 1][itemIndex + 1].neighbours = arrColumns[arrayIndex + 1][itemIndex + 1].neighbours + 1;
                        }
                    }
                }
            });
        });
        setTileArr(arrColumns);
    }

    useEffect(() => {
        if (gameStatus === GameStatuses.Restart) {
            dispatch(updateGameStatus(GameStatuses.Idle));
            dispatch(updateSmileStatus(SmileStatuses.Smile));
            // dispatch(deleteMineCoordinates());
            generateMineField();
        }
        if (gameStatus === GameStatuses.Win) {
            dispatch(updateSmileStatus(SmileStatuses.Cool));
        }
    }, [gameStatus]);

    useEffect(() => {
        if (compareTwoMatrixArray(mineCoordinates, flagCoordinates) === mineCoordinates.length && mineCount === 0) {
            dispatch(updateGameStatus(GameStatuses.Win));
        }
    }, [mineCount]);

    useEffect(() => {
        // dispatch(deleteMineCoordinates());
        generateMineField();
    }, []);

    return (
        <div className="app__content-down">
            {tileArr.map((item) => {
                return item.map((item) => {
                    return (
                        <Tile status={item.status}
                              neighbours={item.neighbours} key={v4()}
                              generator={generateMineField}
                              tileCoordinates={item.tileCoordinates}
                              pressedTile={item.pressedTile}
                              borderTile={item.borderTile}
                              waveGenerator={waveGenerator}
                              renderCount={item.renderCount}
                              flag={item.flag}
                              question={item.question}/>
                    );
                });
            })}
        </div>
    );
}

export default GameField;