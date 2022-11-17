import type { BaseQuery, BaseMutation } from 'types/api';

/* ================================================== */

export type SolvedProblemQuery = BaseQuery<{}, Problem>;

/* ================================================== */

export type ProblemQuery = BaseQuery<
  {
    problemId: string;
  },
  Problem
>;

/* ================================================== */

export type CurriculumQuery = BaseQuery<
  {
    problemId: string;
  } & {
    count: number;
  },
  Problem[]
>;

/* ================================================== */

export type SubmitProblemMutation = BaseMutation<
  {
    problemId: string;
    code: string;
  },
  {}
>;

/* ================================================== */

export type HotUserProblemQuery = BaseQuery<
  {
    type: 'click' | 'vulnerable' | 'similar' | 'unfamiliar';
  },
  Problem[]
>;

/* ================================================== */

export type ColdUserProblemQuery = BaseQuery<
  {
    type: 'vulnerable' | 'popular' | 'trial';
  },
  Problem[]
>;

/* ================================================== */
/* ================================================== */
/* ================================================== */
/* ================================================== */

/**
 * 문제 타입
 */
export type Problem = {
  _id: string;
  /** 문제 ID - 백준 */
  problemId: string;
  /** 맞춘 사람 수 */
  corretPeople: number;
  /** 문제 제목 */
  titleKo: string;
  /** 설명 - HTML */
  description: string;
  /** 문제 조건 - HTML */
  limit: string;
  /** 노트 - HTML */
  note: string | null;
  /** 문제 예시 */
  example: {
    /** 예시 설명 - HTML */
    sample_explain: string | null;
    /** 예시 입력값 */
    samle_input: string;
    /** 예시 출력값 */
    sample_output: string;
  }[];
  /** 입력값 */
  input: string;
  /** 출력값 */
  output: string;
  /** 메모리제한 */
  memoryLimit: string;
  /** 시간 제한(sec) */
  timeLimit: string;
  /** 문제 난이도 (1 ~ 15) */
  level: number;
  /** 태그 목록 */
  tags: string[];
};

/* ================================================== */
/* ================================================== */
/* ================================================== */
/* ================================================== */
