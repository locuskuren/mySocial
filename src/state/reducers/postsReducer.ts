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

export const postsReducer = (
  state: PostsState = initialState,
  action: PostsInterfaces
): PostsState => {
  switch (action.type) {
    case PostsActionTypes.POSTS_LOAD_REQUEST:
      return { ...state, loading: true, error: '' };
    case PostsActionTypes.POSTS_LOAD_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case PostsActionTypes.POSTS_LOAD_FAIL:
      return { ...state, loading: false, error: action.payload };
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
