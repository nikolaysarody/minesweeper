import React, { useEffect, useRef, useState } from 'react';
import styles from './Counter.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { ICounter, Numbers } from '../model/types';

export const Counter: React.FC<ICounter> = ({ count, side }) => {
    const [display, setDisplay] = useState<Numbers[]>([
        Numbers.NumberZero,
        Numbers.NumberZero,
        Numbers.NumberZero,
    ]);
    const counterContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (counterContainer.current) {
            counterContainer.current.ondragstart = () => false;
        }
    }, [counterContainer]);

    useEffect(() => {
        if (count <= 999 && count >= 0) {
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
                default:
                    break;
                }
            });
            setDisplay(newDisplay);
        } else if (count <= 0) {
            setDisplay([Numbers.NumberZero, Numbers.NumberZero, Numbers.NumberZero]);
        } else {
            setDisplay([Numbers.NumberNine, Numbers.NumberNine, Numbers.NumberNine]);
        }
    }, [count]);

    return (
        <div className={classNames(styles.Counter, {}, [styles[side]])} ref={counterContainer}>
            <img src={display[0] as unknown as string} alt="0" />
            <img src={display[1] as unknown as string} alt="0" />
            <img src={display[2] as unknown as string} alt="0" />
        </div>
    );
};
