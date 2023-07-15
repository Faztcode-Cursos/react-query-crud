import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'

//* Objeto de configuración de React query que crea un cliente
const queryClientProvider = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Contexto de React query */}
    <QueryClientProvider client={queryClientProvider}>
      <App />
      {/* Debugger de React query */}
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>
);
