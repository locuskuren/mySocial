import { Post } from '../../api/api-data-interfaces';
import { PostsActionTypes } from '../action-types';

interface PostsRequest {
  type: PostsActionTypes.POSTS_LOAD_REQUEST;
}

interface PostsSucess {
  type: PostsActionTypes.POSTS_LOAD_SUCCESS;
  payload: Post[];
}

interface PostsFail {
  type: PostsActionTypes.POSTS_LOAD_FAIL;
  payload: string;
}

interface PostsReset {
  type: PostsActionTypes.POSTS_RESET;
}

interface PostsLikesUpdate {
  type: PostsActionTypes.POSTS_LIKES_UPDATE;
  payload: Post;
}

interface PostsDelte {
  type: PostsActionTypes.POSTS_DELETE;
  payload: string;
}

export type PostsInterfaces =
  | PostsRequest
  | PostsSucess
  | PostsFail
  | PostsReset
  | PostsLikesUpdate
  | PostsDelte;
