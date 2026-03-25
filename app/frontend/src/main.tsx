import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
 import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
 import {router} from '@/router/index';

const queryClient = new QueryClient();

createRoot(
  document.getElementById('root')!,
).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} /> 
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>,
);
