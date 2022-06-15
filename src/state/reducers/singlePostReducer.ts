import { Post } from '../../api/api-data-interfaces';
import { SinglePostInterfaces } from '../actions';
import { SinglePostActionTypes } from '../action-types';

interface PostState {
  post: Post | null;
  loading: boolean;
  error: string;
}

const initialState: PostState = {
  post: null,
  loading: false,
  error: '',
};

export const singlePostReducer = (
  state: PostState = initialState,
  action: SinglePostInterfaces
): PostState => {
  switch (action.type) {
    case SinglePostActionTypes.POST_LOAD_REQUEST:
      return { loading: true, error: '', post: null };
    case SinglePostActionTypes.POST_LOAD_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case SinglePostActionTypes.POST_LOAD_FAIL:
      return { loading: false, error: action.payload, post: null };
    case SinglePostActionTypes.POST_CREATE_REQUEST:
      return { loading: true, error: '', post: null };
    case SinglePostActionTypes.POST_CREATE_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case SinglePostActionTypes.POST_CREATE_FAIL:
      return { loading: false, error: action.payload, post: null };
    case SinglePostActionTypes.POST_COMMENT_REQUEST:
      return { ...state, loading: true, error: '' };
    case SinglePostActionTypes.POST_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        post: {
          ...(state.post || action.payload),
          comments: action.payload.comments,
        },
      };
    case SinglePostActionTypes.POST_COMMENT_FAIL:
      return { loading: false, error: action.payload, post: null };
    case SinglePostActionTypes.POST_LIKE_REQUEST:
      return { ...state, loading: true, error: '' };
    case SinglePostActionTypes.POST_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        post: {
          ...(state.post || action.payload),
          likes: action.payload.likes,
        },
      };
    case SinglePostActionTypes.POST_LIKE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SinglePostActionTypes.POST_UNLIKE_REQUEST:
      return { ...state, loading: true, error: '' };
    case SinglePostActionTypes.POST_UNLIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        post: {
          ...(state.post || action.payload),
          likes: action.payload.likes,
        },
      };
    case SinglePostActionTypes.POST_UNLIKE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SinglePostActionTypes.POST_DELETE_REQUEST:
      return { ...state, loading: true, error: '' };
    case SinglePostActionTypes.POST_DELETE_SUCCESS:
      return initialState;
    case SinglePostActionTypes.POST_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SinglePostActionTypes.POST_RESET:
      return initialState;
    default:
      return state;
  }
};
