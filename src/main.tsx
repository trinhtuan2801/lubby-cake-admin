import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <ToastContainer />
    </ThemeProvider>
  </Provider>,
);
