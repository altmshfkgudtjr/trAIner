import { QueryCache, MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// hooks
import apiErrorHandler from 'hooks/commons/useApiError';

/**
 * React-Query 객체 옵션
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 30,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: error => {
      const { handleError } = apiErrorHandler();
      return handleError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      const { handleError } = apiErrorHandler();
      return handleError(error);
    },
  }),
});

/**
 * React-Query Component Provider
 */
const QueryProvider = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
