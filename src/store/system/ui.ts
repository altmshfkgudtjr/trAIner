import { atom } from 'recoil';

/* ============================== Atom =============================== */

const uiState = atom<State>({
  key: 'uiState',
  default: {},
});

export type State = {};

/* ============================= Selector ============================= */

export default uiState;
