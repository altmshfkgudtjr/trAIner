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
    refreshToken: string;
  }
>;

/* ================================================== */

export type SignUpMutation = BaseMutation<
  {
    id: string;
    pw: string;
  },
  {
    refreshToken: string;
  }
>;

/* ================================================== */

export type RefreshTokenMutation = BaseMutation<
  {},
  {
    refreshToken: string;
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
  id: string;
  name: string;
};

/* ================================================== */
/* ================================================== */
/* ================================================== */
/* ================================================== */
