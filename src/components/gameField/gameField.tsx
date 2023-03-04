import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import './gameField.scss';
import Tile from './tile/tile';
import {GameStatuses, ITile, TileStatuses} from '../../models/models';
import {useAppDispatch, useAppSelector} from '../../hook';
import {updateCount, updateGameStatus} from '../../store/slices/mineSlice';

const GameField: React.FC = () => {
    const gameStatus = useAppSelector(state => state.mine.gameStatus);
    const [tileArr, setTileArr] = useState<ITile[][]>([]);
    const dispatch = useAppDispatch();

    const compareTwoArray = (a1: number[], a2: number[] = []) => {
        return a1.toString() === a2.toString();
    }

    const checkNeighbours = (neighbours: number) => {
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
                    item.status = checkNeighbours(item.neighbours);
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
        let count = 0;
        const arrColumns: ITile[][] = [];
        while (count < 40) {
            for (let i = 0; i < 16; i++) {
                const arrRows: ITile[] = [];
                for (let j = 0; j < 16; j++) {
                    if (Math.round(Math.random() * (5 - 1) + 1) === 5 && count < 40 && !compareTwoArray([i, j], ignore)) {
                        arrRows[j] = {
                            status: TileStatuses.TileMine,
                            neighbours: 0,
                            tileCoordinates: [i, j],
                            pressedTile: false
                        }
                        if (!arrColumns[i]) {
                            count++;
                            dispatch(updateCount(count));
                        } else if (arrColumns[i][j] && arrColumns[i][j].status !== TileStatuses.TileMine) {
                            count++;
                            dispatch(updateCount(count));
                        }
                    } else {
                        if (!arrColumns[i]) {
                            arrRows[j] = {
                                status: TileStatuses.TileVoid,
                                neighbours: 0,
                                tileCoordinates: [i, j],
                                pressedTile: compareTwoArray([i, j], ignore)
                            }
                        } else if (arrColumns[i][j] && arrColumns[i][j].status === TileStatuses.TileMine) {
                            arrRows[j] = {
                                status: TileStatuses.TileMine,
                                neighbours: 0,
                                tileCoordinates: [i, j],
                                pressedTile: false
                            }
                        } else {
                            arrRows[j] = {
                                status: TileStatuses.TileVoid,
                                neighbours: arrColumns[i][j].neighbours,
                                tileCoordinates: [i, j],
                                pressedTile: compareTwoArray([i, j], ignore)
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
        console.log(gameStatus)
        if (gameStatus === GameStatuses.Restart) {
            dispatch(updateGameStatus(GameStatuses.Idle));
            generateMineField();
        }
    }, [gameStatus]);

    useEffect(() => {
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
                              renderCount={item.renderCount}/>
                    );
                });
            })}
        </div>
    );
}

export default GameField;