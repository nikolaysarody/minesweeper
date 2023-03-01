import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import './gameField.scss';
import Tile from './tile/tile';


const GameField: React.FC = () => {
    const [tileArr, setTileArr] = useState<JSX.Element[][]>([]);

    useEffect(() => {
        const arrRows: JSX.Element[] = [];
        const arrColumns: JSX.Element[][] = [];
        for (let i = 0; i < 16; i++) {
            arrRows[i] = <Tile key={v4()}/>;
        }
        for (let i = 0; i < 16; i++) {
            arrColumns[i] = arrRows;
        }
        setTileArr(arrColumns);
    }, []);

    return (
        <div className="app__content-down">
            {tileArr.map((item) => item)}
        </div>
    );
}

export default GameField;