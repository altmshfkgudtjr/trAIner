import type { BaseQuery, BaseMutation } from 'types/api';

/* ================================================== */

export type ProfileQuery = BaseQuery<{}, User>;

/* ================================================== */

export type UserQuery = BaseQuery<{ userId: string }, User>;

/* ================================================== */

export type SignInMutation = BaseMutation<
  {
    id: string;
    pw: string;
    /** 로그인 상태 유지 여부 */
    isPersist: boolean;
  },
  {
    refresh_token: string;
  }
>;

/* ================================================== */

export type SignOutMutation = BaseMutation<{}, {}>;

/* ================================================== */

export type SignUpMutation = BaseMutation<
  {
    id: string;
    pw: string;
  },
  {
    refresh_token: string;
  }
>;

/* ================================================== */

export type RefreshTokenMutation = BaseMutation<
  {},
  {
    refresh_token: string;
  }
>;

/* ================================================== */
/* ================================================== */
/* ================================================== */
/* ================================================== */

/**
 * 유저 타입
 */
export type User = {
  _id: string;
  userId: string;
  isHotUser: boolean;
};

/* ================================================== */
/* ================================================== */
/* ================================================== */
/* ================================================== */
