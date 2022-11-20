import { useQuery, useMutation } from '@tanstack/react-query';
import request from 'api';
// types
import type { AxiosError } from 'axios';
import type * as types from 'types/api/admin';

/**
 * CTR Model 기준 임계치 파라미티 조절
 * @query
 * @version 1
 */
export const useCTR_threshold_query = (props?: Select<types.CTR_threshold_query, 'Props'>) => {
  return useQuery<Select<types.CTR_threshold_query, 'Response'>, AxiosError>(
    ['useCTR_threshold_query'],
    () => request.get('/api/v1/admin/ctr-threshold'),
    { ...props?.options },
  );
};

/**
 * CTR Model 기준 임계치 파라미티 조절
 * @mutation
 * @version 1
 */
export const useCTR_threshold_mutation = (
  props?: Select<types.CTR_threshold_mutation, 'Props'>,
) => {
  return useMutation<
    Select<types.CTR_threshold_mutation, 'Response'>,
    AxiosError,
    Select<types.CTR_threshold_mutation, 'Variables'>
  >(
    data =>
      request.put('/api/v1/admin/ctr-threshold', null, {
        params: {
          value: data.value,
        },
      }),
    { ...props?.options },
  );
};

/**
 * Deep Model 기준 임계치 파라미티 조절
 * @query
 * @version 1
 */
export const useDeep_threshold_query = (props?: Select<types.deep_threshold_query, 'Props'>) => {
  return useQuery<Select<types.deep_threshold_query, 'Response'>, AxiosError>(
    ['useDeep_threshold_query'],
    () => request.get('/api/v1/admin/deep-threshold'),
    { ...props?.options },
  );
};

/**
 * Deep Model 기준 임계치 파라미티 조절
 * @mutation
 * @version 1
 */
export const useDeep_threshold_mutation = (
  props?: Select<types.deep_threshold_mutation, 'Props'>,
) => {
  return useMutation<
    Select<types.deep_threshold_mutation, 'Response'>,
    AxiosError,
    Select<types.deep_threshold_mutation, 'Variables'>
  >(
    data =>
      request.put('/api/v1/admin/deep-threshold', null, {
        params: {
          value: data.value,
        },
      }),
    { ...props?.options },
  );
};

/**
 * Hot User Random 파라미터 조절
 * @query
 * @version 1
 */
export const useHotuser_random_query = (props?: Select<types.hotuser_random_query, 'Props'>) => {
  return useQuery<Select<types.hotuser_random_query, 'Response'>, AxiosError>(
    ['useHotuser_random_query'],
    () => request.get('/api/v1/admin/hotuser-random'),
    { ...props?.options },
  );
};

/**
 * Hot User Random 파라미터 조절
 * @mutation
 * @version 1
 */
export const useHotuser_random_mutation = (
  props?: Select<types.hotuser_random_mutation, 'Props'>,
) => {
  return useMutation<
    Select<types.hotuser_random_mutation, 'Response'>,
    AxiosError,
    Select<types.hotuser_random_mutation, 'Variables'>
  >(
    data =>
      request.put('/api/v1/admin/hotuser-random', null, {
        params: {
          value: data.value,
        },
      }),
    { ...props?.options },
  );
};

/**
 * Topic Model 기준 유사도 조절
 * @query
 * @version 1
 */
export const useTopic_similarity_query = (
  props?: Select<types.topic_similarity_query, 'Props'>,
) => {
  return useQuery<Select<types.topic_similarity_query, 'Response'>, AxiosError>(
    ['useTopic_similarity_query'],
    () => request.get('/api/v1/admin/topic-similarity'),
    { ...props?.options },
  );
};

/**
 * Topic Model 기준 유사도 조절
 * @mutation
 * @version 1
 */
export const useTopic_similarity_mutation = (
  props?: Select<types.topic_similarity_mutation, 'Props'>,
) => {
  return useMutation<
    Select<types.topic_similarity_mutation, 'Response'>,
    AxiosError,
    Select<types.topic_similarity_mutation, 'Variables'>
  >(
    data =>
      request.put('/api/v1/admin/topic-similarity', null, {
        params: {
          value: data.value,
        },
      }),
    { ...props?.options },
  );
};

/**
 * Cold & Hot User 기준 유사도 조절
 * @query
 * @version 1
 */
export const useColdToHotQuery = (props?: Select<types.cold_to_hot_query, 'Props'>) => {
  return useQuery<Select<types.cold_to_hot_query, 'Response'>, AxiosError>(
    ['useColdToHotQuery'],
    () => request.get('/api/v1/admin/cold-to-hot'),
    { ...props?.options },
  );
};

/**
 * Cold & Hot User 기준 유사도 조절
 * @mutation
 * @version 1
 */
export const useColdToHotMutation = (props?: Select<types.cold_to_hot_mutation, 'Props'>) => {
  return useMutation<
    Select<types.cold_to_hot_mutation, 'Response'>,
    AxiosError,
    Select<types.cold_to_hot_mutation, 'Variables'>
  >(
    data =>
      request.put('/api/v1/admin/cold-to-hot', null, {
        params: {
          value: data.value,
        },
      }),
    { ...props?.options },
  );
};
