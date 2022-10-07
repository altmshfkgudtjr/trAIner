import { atom, selector } from 'recoil';

/* ============================== Atom =============================== */

const uiState = atom<State>({
  key: 'uiState',
  default: {
    side: 'Open',
  },
});

export type SideState = 'Open' | 'Close';

export type State = {
  side: SideState;
};

/* ============================= Selector ============================= */

/** 현재 사이드바 상태 설정 */
export const setSideState = selector<SideState>({
  key: 'uiSideState',
  get: ({ get }) => get(uiState).side,
  set: ({ set }, newValue) => {
    const side = newValue as SideState;
    set(uiState, (prevState): State => ({ ...prevState, side }));
  },
});

export default uiState;
