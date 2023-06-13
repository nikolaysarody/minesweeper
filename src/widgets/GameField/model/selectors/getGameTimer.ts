import { RootState } from '../../../../app/providers/StoreProvider/config/store';

export const getGameTimer = (state: RootState) => state?.game.timer;
