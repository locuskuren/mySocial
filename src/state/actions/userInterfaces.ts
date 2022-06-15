import { AuthUser, User } from '../../api/api-data-interfaces';
import { UserActionTypes } from '../action-types';

interface UserLoginRequest {
  type: UserActionTypes.USER_LOGIN_REQUEST;
}

interface UserLoginSuccess {
  type: UserActionTypes.USER_LOGIN_SUCCESS;
  payload: AuthUser;
}

interface UserLoginFail {
  type: UserActionTypes.USER_LOGIN_FAIL;
  payload: string;
}

interface UserLoginErrorReset {
  type: UserActionTypes.USER_ERROR_RESET;
}

interface UserLogout {
  type: UserActionTypes.USER_LOGOUT;
}

interface UserRegisterRequest {
  type: UserActionTypes.USER_REGISTER_REQUEST;
}

interface UserRegisterSuccess {
  type: UserActionTypes.USER_REGISTER_SUCCESS;
}

interface UserRegisterFail {
  type: UserActionTypes.USER_REGISTER_FAIL;
  payload: string;
}

interface UserFollowRequest {
  type: UserActionTypes.USER_FOLLOW_REQUEST;
}

interface UserFollowSuccess {
  type: UserActionTypes.USER_FOLLOW_SUCESS;
  payload: User;
}

interface UserFollowFail {
  type: UserActionTypes.USER_FOLLOW_FAIL;
  payload: string;
}

interface UserUnfollowReqest {
  type: UserActionTypes.USER_UNFOLLOW_REQUEST;
}

interface UserUnfollowSuccess {
  type: UserActionTypes.USER_UNFOLLOW_SUCESS;
  payload: User;
}

interface UserUnfollowFail {
  type: UserActionTypes.USER_UNFOLLOW_FAIL;
  payload: string;
}

interface UserUpdatePicRequest {
  type: UserActionTypes.USER_UPDATE_PIC_REQUEST;
}

interface UserUpdatePicSuccess {
  type: UserActionTypes.USER_UPDATE_PIC_SUCCESS;
  payload: User;
}

interface UserUpdatePicFail {
  type: UserActionTypes.USER_UPDATE_PIC_FAIL;
  payload: string;
}

export type UserInterfaces =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFail
  | UserLogout
  | UserLoginErrorReset
  | UserFollowRequest
  | UserFollowSuccess
  | UserFollowFail
  | UserUnfollowReqest
  | UserUnfollowSuccess
  | UserUnfollowFail
  | UserUpdatePicRequest
  | UserUpdatePicSuccess
  | UserUpdatePicFail
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFail;
