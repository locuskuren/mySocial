import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
