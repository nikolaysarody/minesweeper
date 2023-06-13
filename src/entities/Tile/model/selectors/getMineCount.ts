import { RootState } from '../../../../app/providers/StoreProvider/config/store';

export const getMineCount = (state: RootState) => state?.mine.count;
