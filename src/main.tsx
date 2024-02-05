import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssVarsProvider } from '@mui/joy';
import theme from './theme/index.ts';
import MyToastContainer from './components/MyToastContainer/MyToastContainer.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <App />
        <MyToastContainer />
      </CssVarsProvider>
    </Provider>
  </QueryClientProvider>,
);
