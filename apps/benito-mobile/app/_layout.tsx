import { Stack } from 'expo-router';

import { Provider as ZenStackHooksProvider } from 'benito-common/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


export default function Layout() {
  return (
      <QueryClientProvider client={queryClient}>
        <ZenStackHooksProvider value={{ endpoint: 'http://10.0.2.2:3002/api/model' }}>
           <Stack screenOptions={{ headerShown: false }} />
        </ZenStackHooksProvider>
      </QueryClientProvider>
  );
}
