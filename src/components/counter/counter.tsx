import React, {useEffect, useState} from 'react';
// import {numberZero} from './number/zero.png';
// import {numberOne} from './number/one.png';
// import {numberTwo} from './number/two.png';
// import {numberThree} from './number/three.png';
// import {numberFour} from './number/four.png';
// import {numberFive} from './number/five.png';
// import {numberSix} from './number/six.png';
// import {numberSeven} from './number/seven.png';
// import {numberEight} from './number/eight.png';
// import {numberNine} from './number/nine.png';

enum Numbers {
    numberZero = '/img/number/zero.png',
    numberOne = '/img/number/one.png',
    numberTwo = '/img/number/two.png',
    numberThree = '/img/number/three.png',
    numberFour = '/img/number/four.png',
    numberFive = '/img/number/five.png',
    numberSix = '/img/number/six.png',
    numberSeven = '/img/number/seven.png',
    numberEight = '/img/number/eight.png',
    numberNine = '/img/number/nine.png',
}
// enum Numbers {
//     '/img/number/zero.png',
//     '/img/number/one.png',
//     '/img/number/two.png',
//     '/img/number/three.png',
//     '/img/number/four.png',
//     '/img/number/five.png',
//     '/img/number/six.png',
//     '/img/number/seven.png',
//     '/img/number/eight.png',
//     '/img/number/nine.png',
// }

interface ICounter {
    count: number
}

const Counter: React.FC<ICounter> = ({count}) => {
    const [display, setDisplay] = useState<Numbers[]>([Numbers.numberZero, Numbers.numberZero, Numbers.numberZero]);

    useEffect(() => {
        const number = count.toString().split('');
        number.forEach((item, index) => {
            switch (item) {
                case '0': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberZero;
                        return prev;
                    });
                    break;
                }
                case '1': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberOne;
                        return prev;
                    });
                    break;
                }
                case '2': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberTwo;
                        return prev;
                    });
                    break;
                }
                case '3': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberThree;
                        return prev;
                    });
                    break;
                }
                case '4': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberFour;
                        return prev;
                    });
                    break;
                }
                case '5': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberFive;
                        return prev;
                    });
                    break;
                }
                case '6': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberSix;
                        return prev;
                    });
                    break;
                }
                case '7': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberSeven;
                        return prev;
                    });
                    break;
                }
                case '8': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberEight;
                        return prev;
                    });
                    break;
                }
                case '9': {
                    setDisplay((prev) => {
                        prev[index] = Numbers.numberNine;
                        return prev;
                    });
                    break;
                }
                default: break;
            }
        })
    }, []);

    return (
        <div>
            <img src={display[0]} alt='0'/>
            <img src={display[1]} alt='0'/>
            <img src={display[2]} alt='0'/>
        </div>
    );
}

export default Counter;