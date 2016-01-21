import React from 'react-native'

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux/native';
import thunk from 'redux-thunk';
import { reducer } from 'ExpHub/reducer.js'

import App from 'ExpHub/containers/App.js'

let {
  AppRegistry,
} = React;

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer)

class ExpHub extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('main', () => ExpHub);