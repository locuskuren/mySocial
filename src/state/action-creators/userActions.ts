import { Dispatch } from 'redux';
import axios from 'axios';

import { mySocialAPi } from '../../api';
import { UserActionTypes } from '../action-types';
import { UserInterfaces } from '../actions';
import { AuthUser, User } from '../../api/api-data-interfaces';

export const userLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserInterfaces>) => {
    dispatch({ type: UserActionTypes.USER_LOGIN_REQUEST });

    try {
      const { data } = await mySocialAPi.post<AuthUser>('/signin', {
        email,
        password,
      });

      dispatch({
        type: UserActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      const message = err.response.data.error
        ? "The email you entered doesn't belong to an account. Please check your email and try again."
        : 'unknown error, please try again or contact admin';
      dispatch({
        type: UserActionTypes.USER_LOGIN_FAIL,
        payload: message,
      });
    }
  };
};

export const userErrorReset = (): UserInterfaces => {
  return { type: UserActionTypes.USER_ERROR_RESET };
};

export const userLogout = (): UserInterfaces => {
  return {
    type: UserActionTypes.USER_LOGOUT,
  };
};

export const userRegister = (name: string, password: string, email: string) => {
  return async (dispatch: Dispatch<UserInterfaces>) => {
    dispatch({ type: UserActionTypes.USER_REGISTER_REQUEST });

    try {
      await mySocialAPi.post<User>('/signup', {
        name,
        password,
        email,
      });

      dispatch({
        type: UserActionTypes.USER_REGISTER_SUCCESS,
      });

      const { data } = await mySocialAPi.post<AuthUser>('/signin', {
        email,
        password,
      });

      dispatch({
        type: UserActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      const message =
        err.response.data.error === 'emailerror'
          ? 'The email you have entered already belongs to an existing account.'
          : 'Unexpected error, please try again or if issue persists contact administrator';

      dispatch({
        type: UserActionTypes.USER_REGISTER_FAIL,
        payload: message,
      });
    }
  };
};

export const userFollow = (token: string, followId: string) => {
  return async (dispatch: Dispatch<UserInterfaces>) => {
    dispatch({ type: UserActionTypes.USER_FOLLOW_REQUEST });

    try {
      const { data } = await mySocialAPi.put<User>(
        '/follow',
        {
          followId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: UserActionTypes.USER_FOLLOW_SUCESS,
        payload: data,
      });
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: UserActionTypes.USER_FOLLOW_FAIL,
        payload: message,
      });
    }
  };
};

export const userUnFollow = (token: string, unfollowId: string) => {
  return async (dispatch: Dispatch<UserInterfaces>) => {
    dispatch({ type: UserActionTypes.USER_UNFOLLOW_REQUEST });

    try {
      const { data } = await mySocialAPi.put<User>(
        '/unfollow',
        {
          unfollowId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: UserActionTypes.USER_UNFOLLOW_SUCESS,
        payload: data,
      });
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: UserActionTypes.USER_UNFOLLOW_FAIL,
        payload: message,
      });
    }
  };
};

export const userUpdatePic = (token: string, img: File) => {
  return async (dispatch: Dispatch<UserInterfaces>) => {
    dispatch({ type: UserActionTypes.USER_UPDATE_PIC_REQUEST });

    try {
      const getBase64 = (img: File) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(img);
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
        });
      };

      const image = await getBase64(img);

      const {
        data: { url },
      } = await axios.post<{ url: string }>(
        'https://api.cloudinary.com/v1_1/locuskuren/image/upload',
        {
          file: image,
          upload_preset: 'nokeyup',
          cloud_name: 'locuskuren',
        }
      );

      const { data } = await mySocialAPi.put<User>(
        `/updatepic`,
        {
          pic: url,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: UserActionTypes.USER_UPDATE_PIC_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: UserActionTypes.USER_UPDATE_PIC_FAIL,
        payload: message,
      });
    }
  };
};
