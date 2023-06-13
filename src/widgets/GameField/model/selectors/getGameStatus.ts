import { RootState } from '../../../../app/providers/StoreProvider/config/store';

export const getGameStatus = (state: RootState) => state?.game.gameStatus;
