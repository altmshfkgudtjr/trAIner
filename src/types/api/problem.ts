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
    type: 'vulnerable' | 'popular' | 'click' | 'algorithm';
    /** type이 algorithm일 때에만 작동 */
    content?: Algorithm;
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
  correctPeople: number;
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
    sample_input: string;
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

/** 알고리즘 타입 */
export type Algorithm =
  | 'math' // '수학'
  | 'implementation' // '구현'
  | 'dp' // '다이나믹 프로그래밍'
  | 'graphs' // '그래프 이론'
  | 'data_structures' // '자료 구조'
  | 'string' // '문자열'
  | 'greedy' // '그리디 알고리즘'
  | 'bruteforcing' // '브루트포스 알고리즘'
  | 'graph_traversal' // '그래프 탐색'
  | 'sorting' // '정렬'
  | 'number_theory' // '정수론'
  | 'geometry' // '기하학'
  | 'trees' // '트리'
  | 'segtree' // '세그먼트 트리'
  | 'binary_search' // '이분 탐색'
  | 'ad_hoc' // '애드훅'
  | 'bfs' // '너비 우선 탐색'
  | 'simulation' // '시뮬레이션'
  | 'arithmetic' // '사칙연산'
  | 'dfs' // '깊이 우선 탐색'
  | 'topological_sorting' // '위상 정렬'
  | 'combinatorics' // '조합론'
  | 'regex' // '정규 표현식'
  | 'floyd_warshall' // '플로이드-워셜'
  | 'primality_test' // '소수 판정'
  | 'sieve' // '에라토스테네스의 체'
  | 'deque' // '덱'
  | 'prefix_sum' // '누적합'
  | 'dijkstra' // '데이크스트라'
  | 'backtracking' // '백트래킹'
  | 'bitmask' // '비트마스킹'
  | 'divide_and_conquer' // '분할 정복'
  | 'stack' // '스택'
  | 'queue' // '큐'
  | 'priority_queue' // '우선순위 큐'
  | 'bellman_ford' // '벨만-포드'
  | 'mst' // '최소 스패닝 트리'
  | 'knapsack'; // '배낭 문제',

/* ================================================== */
/* ================================================== */
/* ================================================== */
/* ================================================== */
