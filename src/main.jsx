import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import configureAppStore from './configureStore';
import LanguageProvider from './containers/LanguageProvider';
import { translationMessages } from './i18n';
import App from './App';
import './index.css';

// Create redux store
const store = configureAppStore();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <App />
      </LanguageProvider>
    </Provider>
  </StrictMode>,
);
