import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import './gameField.scss';
import Tile from './tile/tile';
import {ITile, TileStatuses} from '../../models/models';
import {useAppDispatch, useAppSelector} from '../../hook';
import {updateCount} from '../../store/slices/mineSlice';

const GameField: React.FC = () => {
    const [tileArr, setTileArr] = useState<ITile[][]>([]);

    const dispatch = useAppDispatch();

    const generateMines = () => {
        let count = 0;
        const arrColumns: ITile[][] = [];
        while (count < 40) {
            for (let i = 0; i < 16; i++) {
                const arrRows: ITile[] = [];
                for (let j = 0; j < 16; j++) {
                    if (Math.round(Math.random() * (5 - 1) + 1) === 5 && count < 40) {
                        arrRows[j] = {
                            tile: <Tile key={v4()} status={TileStatuses.TileMine}/>,
                            status: TileStatuses.TileMine
                        }
                        if (!arrColumns[i]) {
                            count++;
                            dispatch(updateCount(count));
                        } else if (arrColumns[i][j] && arrColumns[i][j].status !== TileStatuses.TileMine) {
                            count++;
                            dispatch(updateCount(count));
                        }
                    } else {
                        if (arrColumns[i] && arrColumns[i][j] && arrColumns[i][j].status === TileStatuses.TileMine) {
                            arrRows[j] = {
                                tile: <Tile key={v4()} status={TileStatuses.TileMine}/>,
                                status: TileStatuses.TileMine
                            }
                        } else {
                            arrRows[j] = {
                                tile: <Tile key={v4()} status={TileStatuses.TileVoid}/>,
                                status: TileStatuses.TileVoid
                            }
                        }
                    }
                }
                arrColumns[i] = arrRows;
            }
        }
        setTileArr(arrColumns);
    }

    useEffect(() => {
        generateMines();
    }, []);

    return (
        <div className="app__content-down">
            {tileArr.map((item) => {
                return item.map((item) => {
                    return item.tile;
                });
            })}
        </div>
    );
}

export default GameField;