import { Post } from '../../api/api-data-interfaces';
import { SinglePostActionTypes } from '../action-types';

interface SinglePostRequest {
  type: SinglePostActionTypes.POST_LOAD_REQUEST;
}

interface SinglePostSucess {
  type: SinglePostActionTypes.POST_LOAD_SUCCESS;
  payload: Post;
}

interface SinglePostFail {
  type: SinglePostActionTypes.POST_LOAD_FAIL;
  payload: string;
}

interface SinglePostCreate {
  type: SinglePostActionTypes.POST_CREATE_REQUEST;
}

interface SinglePostCreateSuccess {
  type: SinglePostActionTypes.POST_CREATE_SUCCESS;
  payload: Post;
}

interface SinglePostCreateFail {
  type: SinglePostActionTypes.POST_CREATE_FAIL;
  payload: string;
}

interface SinglePostCommentRequest {
  type: SinglePostActionTypes.POST_COMMENT_REQUEST;
}

interface SinglePostCommentSucess {
  type: SinglePostActionTypes.POST_COMMENT_SUCCESS;
  payload: Post;
}

interface SinglePostCommentFail {
  type: SinglePostActionTypes.POST_COMMENT_FAIL;
  payload: string;
}

interface SinglePostLikeRequest {
  type: SinglePostActionTypes.POST_LIKE_REQUEST;
}

interface SinglePostLikeSuccess {
  type: SinglePostActionTypes.POST_LIKE_SUCCESS;
  payload: Post;
}

interface SinglePostLikeFail {
  type: SinglePostActionTypes.POST_LIKE_FAIL;
  payload: string;
}

interface SinglePostUnlikeRequest {
  type: SinglePostActionTypes.POST_UNLIKE_REQUEST;
}

interface SinglePostUnlikeSuccess {
  type: SinglePostActionTypes.POST_UNLIKE_SUCCESS;
  payload: Post;
}

interface SinglePostUnlikeFail {
  type: SinglePostActionTypes.POST_UNLIKE_FAIL;
  payload: string;
}

interface SinglePostDeleteRequest {
  type: SinglePostActionTypes.POST_DELETE_REQUEST;
}

interface SinglePostDeleteSuccess {
  type: SinglePostActionTypes.POST_DELETE_SUCCESS;
}

interface SinglePostDeleteFail {
  type: SinglePostActionTypes.POST_DELETE_FAIL;
  payload: string;
}

interface SinglePostReset {
  type: SinglePostActionTypes.POST_RESET;
}

export type SinglePostInterfaces =
  | SinglePostRequest
  | SinglePostSucess
  | SinglePostFail
  | SinglePostCreate
  | SinglePostCreateSuccess
  | SinglePostCreateFail
  | SinglePostCommentRequest
  | SinglePostCommentSucess
  | SinglePostCommentFail
  | SinglePostLikeRequest
  | SinglePostLikeSuccess
  | SinglePostLikeFail
  | SinglePostUnlikeRequest
  | SinglePostUnlikeSuccess
  | SinglePostUnlikeFail
  | SinglePostDeleteRequest
  | SinglePostDeleteSuccess
  | SinglePostDeleteFail
  | SinglePostReset;
