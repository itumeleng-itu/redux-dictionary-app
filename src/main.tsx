import React from 'react'; // Import React for JSX support and StrictMode
import ReactDOM from 'react-dom/client'; // Modern React DOM API for creating root
import App from './App.tsx'; // Root application component
//import './index.css'; // Optional global styles (currently not used)
import { store } from './store/store.ts'; // The configured Redux store instance
import { Provider } from 'react-redux'; // Provider makes the store available to React components

ReactDOM.createRoot(document.getElementById('root')!).render( // Mount React app at #root
  <React.StrictMode> {/* Enable extra checks and warnings in development */}
    <Provider store={store}> {/* Supply Redux store to the component tree */}
      <App /> {/* Render the application */}
    </Provider>
  </React.StrictMode>,
);