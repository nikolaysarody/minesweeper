export enum SmileStatuses {
    Smile = '/minesweeper/img/smile/default.png',
    PressedSmile = '/minesweeper/img/smile/default-pressed.png',
    Cool = '/minesweeper/img/smile/cool.png',
    Dead = '/minesweeper/img/smile/dead.png',
    Scary = '/minesweeper/img/smile/scary.png'
}

export enum GameStatuses {
    Idle = 'IDLE',
    Begin = 'BEGIN',
    End = 'END',
    Restart = 'RESTART',
    Win = 'WIN'
}

export enum TileStatuses {
    TileDefault = '/minesweeper/img/tile/default.png',
    TileOne = '/minesweeper/img/tile/one.png',
    TileTwo = '/minesweeper/img/tile/two.png',
    TileThree = '/minesweeper/img/tile/three.png',
    TileFour = '/minesweeper/img/tile/four.png',
    TileFive = '/minesweeper/img/tile/five.png',
    TileSix = '/minesweeper/img/tile/six.png',
    TileSeven = '/minesweeper/img/tile/seven.png',
    TileEight = '/minesweeper/img/tile/eight.png',
    TileVoid = '/minesweeper/img/tile/void.png',
    TileMine = '/minesweeper/img/tile/mine.png',
    TileMineExploded = '/minesweeper/img/tile/mine-exploded.png',
    TileMineWrong = '/minesweeper/img/tile/mine-wrong.png',
    TileQuestion = '/minesweeper/img/tile/question.png',
    TileQuestionPressed = '/minesweeper/img/tile/question-pressed.png',
    TileFlag = '/minesweeper/img/tile/flag.png',
}

export enum Numbers {
    NumberZero = '/minesweeper/img/number/zero.png',
    NumberOne = '/minesweeper/img/number/one.png',
    NumberTwo = '/minesweeper/img/number/two.png',
    NumberThree = '/minesweeper/img/number/three.png',
    NumberFour = '/minesweeper/img/number/four.png',
    NumberFive = '/minesweeper/img/number/five.png',
    NumberSix = '/minesweeper/img/number/six.png',
    NumberSeven = '/minesweeper/img/number/seven.png',
    NumberEight = '/minesweeper/img/number/eight.png',
    NumberNine = '/minesweeper/img/number/nine.png'
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
