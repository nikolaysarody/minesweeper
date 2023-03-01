import React, {useEffect, useState} from 'react';
import {Numbers} from '../../models/models';

interface ICounter {
    count: number
}

const Counter: React.FC<ICounter> = ({count}) => {
    const [display, setDisplay] = useState<Numbers[]>([Numbers.NumberZero, Numbers.NumberZero, Numbers.NumberZero]);

    useEffect(() => {
        const number = count.toString().split('');
        while (number.length < 3) {
            number.unshift('0');
        }
        const newDisplay: Numbers[] = [];
        number.forEach((item, index) => {
            switch (item) {
                case '0': {
                    newDisplay[index] = Numbers.NumberZero;
                    break;
                }
                case '1': {
                    newDisplay[index] = Numbers.NumberOne;
                    break;
                }
                case '2': {
                    newDisplay[index] = Numbers.NumberTwo;
                    break;
                }
                case '3': {
                    newDisplay[index] = Numbers.NumberThree;
                    break;
                }
                case '4': {
                    newDisplay[index] = Numbers.NumberFour;
                    break;
                }
                case '5': {
                    newDisplay[index] = Numbers.NumberFive;
                    break;
                }
                case '6': {
                    newDisplay[index] = Numbers.NumberSix;
                    break;
                }
                case '7': {
                    newDisplay[index] = Numbers.NumberSeven;
                    break;
                }
                case '8': {
                    newDisplay[index] = Numbers.NumberEight;
                    break;
                }
                case '9': {
                    newDisplay[index] = Numbers.NumberNine;
                    break;
                }
                default: break;
            }
        });
        setDisplay(newDisplay);
    }, []);

    return (
        <>
            <img src={display[0]} alt='0'/>
            <img src={display[1]} alt='0'/>
            <img src={display[2]} alt='0'/>
        </>
    );
}

export default Counter;