import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import './gameField.scss';
import Tile from './tile/tile';
import {ITile, TileStatuses} from '../../models/models';
import {useAppDispatch} from '../../hook';
import {updateCount} from '../../store/slices/mineSlice';

const GameField: React.FC = () => {
    const [tileArr, setTileArr] = useState<ITile[][]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let count = 0;
        const arrColumns: ITile[][] = [];
        while (count < 40) {
            for (let i = 0; i < 16; i++) {
                const arrRows: ITile[] = [];
                for (let j = 0; j < 16; j++) {
                    if (Math.round(Math.random() * (5 - 1) + 1) === 5 && count < 40) {
                        arrRows[j] = {
                            status: TileStatuses.TileMine,
                            neighbours: 0
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
                                neighbours: 0
                            }
                        } else if (arrColumns[i][j] && arrColumns[i][j].status === TileStatuses.TileMine) {
                            arrRows[j] = {
                                status: TileStatuses.TileMine,
                                neighbours: 0
                            }
                        } else {
                            arrRows[j] = {
                                status: TileStatuses.TileVoid,
                                neighbours: arrColumns[i][j].neighbours
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
            })
        })
        setTileArr(arrColumns);
    }, []);

    return (
        <div className="app__content-down">
            {tileArr.map((item) => {
                return item.map((item) => {
                    return (
                        <Tile status={item.status} neighbours={item.neighbours} key={v4()}/>
                    );
                });
            })}
        </div>
    );
}

export default GameField;