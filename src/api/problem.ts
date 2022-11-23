import { useQuery, useMutation } from '@tanstack/react-query';
import request from 'api';
// types
import type { AxiosError } from 'axios';
import type * as types from 'types/api/problem';

/**
 * 내가 푼 문제 반환
 * @query
 * @version 1
 */
export const useSolvedProblemQuery = (props?: Select<types.SolvedProblemQuery, 'Props'>) => {
  return useQuery<Select<types.SolvedProblemQuery, 'Response'>, AxiosError>(
    ['useSolvedProblemQuery', props?.limit],
    () =>
      request.get(`/api/v1/problems/me`, {
        params: {
          skip: props?.skip,
          limit: props?.limit,
        },
      }),
    { ...props?.options },
  );
};

/**
 * 내가 가장 최근 푼 문제 반환
 * @query
 * @version 1
 */
export const useLastlySolvedProblemQuery = (
  props?: Select<types.LastlySolvedProblemQuery, 'Props'>,
) => {
  return useQuery<Select<types.LastlySolvedProblemQuery, 'Response'>, AxiosError>(
    ['useLastlySolvedProblemQuery'],
    () => request.get(`/api/v1/problems/me/latest`),
    { ...props?.options },
  );
};

/**
 * 문제 조회
 * @query
 * @version 1
 */
export const useProblemQuery = (props?: Select<types.ProblemQuery, 'Props'>) => {
  return useQuery<Select<types.ProblemQuery, 'Response'>, AxiosError>(
    ['useProblemQuery', props?.problemId],
    () => request.get(`/api/v1/problems/${props?.problemId}`),
    { ...props?.options },
  );
};

/**
 * 커리큘럼 조회
 * @query
 * @version 1
 */
export const useCurriculumQuery = (props?: Select<types.CurriculumQuery, 'Props'>) => {
  return useQuery<Select<types.CurriculumQuery, 'Response'>, AxiosError>(
    ['useCurriculumQuery', props?.problemId, props?.count],
    () =>
      request.get(`/api/v1/problems/curriculum/${props?.problemId}`, {
        params: {
          count: props?.count,
        },
      }),
    { ...props?.options },
  );
};

/**
 * 문제 제출/채점
 * @mutation
 * @version 1
 */
export const useSubmitProblemMutation = (props?: Select<types.SubmitProblemMutation, 'Props'>) => {
  return useMutation<
    Select<types.SubmitProblemMutation, 'Response'>,
    AxiosError,
    Select<types.SubmitProblemMutation, 'Variables'>
  >(
    data =>
      request.post(`/api/v1/problems/${data.problemId}/submit`, {
        code: data.code,
      }),
    { ...props?.options },
  );
};

/**
 * Hotuser 문제 조회
 * @query
 * @version 1
 */
export const useHotUserProblemQuery = (props?: Select<types.HotUserProblemQuery, 'Props'>) => {
  return useQuery<Select<types.HotUserProblemQuery, 'Response'>, AxiosError>(
    ['useHotUserProblemQuery', props?.type],
    () =>
      request.get(`/api/v1/problems/hot`, {
        params: {
          feed: props?.type,
          count: props?.count,
        },
      }),
    { ...props?.options },
  );
};

/**
 * Colduser 문제 조회
 * @query
 * @version 1
 */
export const useColdUserProblemQuery = (props?: Select<types.ColdUserProblemQuery, 'Props'>) => {
  return useQuery<Select<types.ColdUserProblemQuery, 'Response'>, AxiosError>(
    ['useColdUserProblemQuery', props?.type, props?.content],
    () => {
      const params = {
        feed: props?.type,
        // count: props?.count,
        count: 10,
      };
      if (props?.type === 'algorithm') {
        Object.assign(params, { content: props.content });
      }
      return request.get(`/api/v1/problems/cold`, { params });
    },
    { ...props?.options },
  );
};
