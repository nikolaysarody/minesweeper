import NumberZeroImg from '../../../../shared/assets/icons/number/zero.png';
import NumberOneImg from '../../../../shared/assets/icons/number/one.png';
import NumberTwoImg from '../../../../shared/assets/icons/number/two.png';
import NumberThreeImg from '../../../../shared/assets/icons/number/three.png';
import NumberFourImg from '../../../../shared/assets/icons/number/four.png';
import NumberFiveImg from '../../../../shared/assets/icons/number/five.png';
import NumberSixImg from '../../../../shared/assets/icons/number/six.png';
import NumberSevenImg from '../../../../shared/assets/icons/number/seven.png';
import NumberEightImg from '../../../../shared/assets/icons/number/eight.png';
import NumberNineImg from '../../../../shared/assets/icons/number/nine.png';

export enum Numbers {
    NumberZero = NumberZeroImg,
    NumberOne = NumberOneImg,
    NumberTwo = NumberTwoImg,
    NumberThree = NumberThreeImg,
    NumberFour = NumberFourImg,
    NumberFive = NumberFiveImg,
    NumberSix = NumberSixImg,
    NumberSeven = NumberSevenImg,
    NumberEight = NumberEightImg,
    NumberNine = NumberNineImg
}

export enum CounterSides {
    right = 'right',
    left = 'left'
}

export interface ICounter {
    count: number,
    side: CounterSides
}
