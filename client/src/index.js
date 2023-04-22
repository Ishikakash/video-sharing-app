import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// => if you open redux tool you will see that our reducer is persisted, 
// => it basically stores our user and other elements inside the local storage
// this is how we are reaching even if we refresh the page
// => And also since we logged in we have a cookie here and it includes our access token it means we are able to upload any video comment to any video
// or fetched subscribe videos right now 

// FIREBASE => is an all in one backend as a service that provides authentication and cloud storage among its many services.