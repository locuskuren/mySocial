import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './userReducer';
import { profilesReducer } from './profilesReducer';
import { singlePostReducer } from './singlePostReducer';
import { postsReducer } from './postsReducer';
import { singleProfileReducer } from './singleProfileReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  profiles: profilesReducer,
  singlePost: singlePostReducer,
  homePosts: postsReducer('home'),
  explorePosts: postsReducer('explore'),
  singleProfile: singleProfileReducer,
});

const reducers = persistReducer(persistConfig, rootReducer);

export default reducers;

export type RootState = ReturnType<typeof reducers>;
