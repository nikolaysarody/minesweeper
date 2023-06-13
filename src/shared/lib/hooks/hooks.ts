import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/providers/StoreProvider/config/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
