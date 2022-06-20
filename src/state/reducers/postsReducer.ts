import { Post } from '../../api/api-data-interfaces';
import { PostsInterfaces } from '../actions';
import { PostsActionTypes } from '../action-types';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const postsReducer = (postsType: string) => {
  return (
    state: PostsState = initialState,
    action: PostsInterfaces
  ): PostsState => {
    switch (action.type) {
      case postsType === 'home'
        ? PostsActionTypes.POSTS_LOAD_REQUEST
        : PostsActionTypes.EXPLORE_POSTS_LOAD_REQUEST:
        return { ...state, loading: true, error: '' };
      case postsType === 'home'
        ? PostsActionTypes.POSTS_LOAD_SUCCESS
        : PostsActionTypes.EXPLORE_POSTS_LOAD_SUCCESS:
        return { ...state, loading: false, posts: action.payload };
      case postsType === 'home'
        ? PostsActionTypes.POSTS_LOAD_FAIL
        : PostsActionTypes.EXPLORE_POSTS_LOAD_FAIL:
        return { posts: [], loading: false, error: action.payload };
      case PostsActionTypes.POSTS_LIKES_UPDATE:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        };
      case PostsActionTypes.POSTS_DELETE:
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
        };
      case PostsActionTypes.POSTS_RESET:
        return initialState;
      default:
        return state;
    }
  };
};
