import { atom } from 'recoil';
// types
import type { User } from 'types/api/user';

/* ============================== Atom =============================== */

const userState = atom<State>({
  key: 'userState',
  default: null,
});

export type State = User | null;

/* ============================= Selector ============================= */

export default userState;
