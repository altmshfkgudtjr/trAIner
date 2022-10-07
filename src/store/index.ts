import {
  useRecoilState as useRecoilState_,
  useRecoilValue as useRecoilValue_,
  useSetRecoilState as useSetRecoilState_,
} from 'recoil';
// store
import * as themeSystem from 'store/system/theme';
import * as modalSystem from 'store/system/modal';
// types
import type { RecoilState, RecoilValue } from 'recoil';

const rootState = {
  themeSystem,
  modalSystem,
};

export type RootState = typeof rootState;

export const useRecoilState = <T>(func: (store: RootState) => RecoilState<T>) => {
  const state = func(rootState);
  return useRecoilState_(state);
};

export const useRecoilValue = <T>(func: (store: RootState) => RecoilValue<T>) => {
  const state = func(rootState);
  return useRecoilValue_(state);
};

export const useSetRecoilState = <T>(func: (store: RootState) => RecoilState<T>) => {
  const state = func(rootState);
  return useSetRecoilState_(state);
};
