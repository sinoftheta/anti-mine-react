
// REACT //
import React from 'react';
import { render } from 'react-dom';

// REDUX //
import { Provider } from 'react-redux';
import store from './redux/store/index.js';

// APP //
import App from './App.js';



render( 
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);
