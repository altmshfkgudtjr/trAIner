import { atom, selector } from 'recoil';

/* ============================== Atom =============================== */

const themeState = atom<State>({
  key: 'themeState',
  default: {
    mode: 'Default',
    system: 'Pending',
  },
});

/** 테마 모드 타입 */
export type Mode = 'Default' | 'Light' | 'Dark';

/** 시스템 테마 타입 */
export type System = 'Pending' | 'Light' | 'Dark';

export type State = {
  mode: Mode;
  system: System;
};

/* ============================= Selector ============================= */

/** 현재 테마 설정 */
export const themeModeState = selector<State | Mode>({
  key: 'themeModeState',
  get: ({ get }) => get(themeState).mode,
  set: ({ set }, newValue) => {
    const mode = newValue as Mode;
    set(themeState, (prevState): State => ({ ...prevState, mode }));
  },
});

/** 현재 시스템 테마 설정 */
export const themeSystemState = selector<State | System>({
  key: 'themeSystemState',
  get: ({ get }) => get(themeState).system,
  set: ({ set }, newValue) => {
    const system = newValue as System;
    set(themeState, (prevState): State => ({ ...prevState, system }));
  },
});

export default themeState;
