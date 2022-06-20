import { Dispatch } from 'redux';

import { mySocialAPi } from '../../api';
import { PostsActionTypes } from '../action-types';
import { PostsInterfaces } from '../actions';
import { Post } from '../../api/api-data-interfaces';

export const getPosts = (type: string, token: string) => {
  return async (dispatch: Dispatch<PostsInterfaces>) => {
    dispatch({
      type:
        type === '/'
          ? PostsActionTypes.POSTS_LOAD_REQUEST
          : PostsActionTypes.EXPLORE_POSTS_LOAD_REQUEST,
    });

    try {
      const { data } = await mySocialAPi.get<Post[]>(
        `/${type === '/' ? 'getsubpost' : 'allposts'}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type:
          type === '/'
            ? PostsActionTypes.POSTS_LOAD_SUCCESS
            : PostsActionTypes.EXPLORE_POSTS_LOAD_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      const message =
        'Something went wrong, please try refreshing page or contact admin';
      dispatch({
        type: PostsActionTypes.POSTS_LOAD_FAIL,
        payload: message,
      });
    }
  };
};

export const resetPosts = (): PostsInterfaces => {
  return {
    type: PostsActionTypes.POSTS_RESET,
  };
};
