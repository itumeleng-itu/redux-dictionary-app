import { useDispatch, useSelector } from 'react-redux' // Typed hooks from react-redux
import type { RootState, AppDispatch } from './store' // Types from our store setup

export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // Dispatch with AppDispatch type
export const useAppSelector = useSelector.withTypes<RootState>() // Selector with RootState type
