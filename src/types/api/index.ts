import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, DefaultResponse } from 'axios';

/**
 * Query Type Group
 * @template PropsType API 인자
 * - 받지 않아도 된다면, `{}` 를 넣어주세요.
 * @template ResponseType API 반환 데이터
 * - 의미가 없는 반환값은 `never`을 넣어주세요.
 */
export type BaseQuery<PropsType, ResponseType> = {
  Options: UseQueryOptions<
    DefaultResponse<ResponseType>,
    AxiosError,
    DefaultResponse<ResponseType>
  >;
  Props:
    | (PropsType & {
        options?: UseQueryOptions<
          DefaultResponse<ResponseType>,
          AxiosError,
          DefaultResponse<ResponseType>
        >;
      })
    | undefined;
  Response: DefaultResponse<ResponseType>;
};

/**
 * Mutation Type Group
 * @template PropsType API 인자
 * @template ResponseType API 반환 데이터
 */
export type BaseMutation<PropsType, ResponseType> = {
  Variables: PropsType;
  Props:
    | { options?: UseMutationOptions<DefaultResponse<ResponseType>, AxiosError, PropsType> }
    | undefined;
  Response: DefaultResponse<ResponseType>;
};
