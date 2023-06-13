import TileDefaultImg from '../../../../shared/assets/icons/tile/default.png';
import TileOneImg from '../../../../shared/assets/icons/tile/one.png';
import TileTwoImg from '../../../../shared/assets/icons/tile/two.png';
import TileThreeImg from '../../../../shared/assets/icons/tile/three.png';
import TileFourImg from '../../../../shared/assets/icons/tile/four.png';
import TileFiveImg from '../../../../shared/assets/icons/tile/five.png';
import TileSixImg from '../../../../shared/assets/icons/tile/six.png';
import TileSevenImg from '../../../../shared/assets/icons/tile/seven.png';
import TileEightImg from '../../../../shared/assets/icons/tile/eight.png';
import TileVoidImg from '../../../../shared/assets/icons/tile/void.png';
import TileMineImg from '../../../../shared/assets/icons/tile/mine.png';
import TileMineExplodedImg from '../../../../shared/assets/icons/tile/mine-exploded.png';
import TileMineWrongImg from '../../../../shared/assets/icons/tile/mine-wrong.png';
import TileQuestionImg from '../../../../shared/assets/icons/tile/question.png';
import TileQuestionPressedImg from '../../../../shared/assets/icons/tile/question-pressed.png';
import TileFlagImg from '../../../../shared/assets/icons/tile/flag.png';

export enum TileStatuses {
    TileDefault = TileDefaultImg,
    TileOne = TileOneImg,
    TileTwo = TileTwoImg,
    TileThree = TileThreeImg,
    TileFour = TileFourImg,
    TileFive = TileFiveImg,
    TileSix = TileSixImg,
    TileSeven = TileSevenImg,
    TileEight = TileEightImg,
    TileVoid = TileVoidImg,
    TileMine = TileMineImg,
    TileMineExploded = TileMineExplodedImg,
    TileMineWrong = TileMineWrongImg,
    TileQuestion = TileQuestionImg,
    TileQuestionPressed = TileQuestionPressedImg,
    TileFlag = TileFlagImg,
}

export interface ITile {
    status: TileStatuses,
    neighbours: number,
    tileCoordinates: number[],
    pressedTile: boolean,
    borderTile?: boolean,
    flag: boolean,
    question: boolean
    renderCount?: number,
}

export interface ITileItem extends ITile {
    generator: (agr: number[]) => void,
    waveGenerator: (agr0: number[], agr1: TileStatuses) => void,
}
