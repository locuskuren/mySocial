import { Dispatch } from 'redux';
import axios from 'axios';

import { mySocialAPi } from '../../api';
import { PostsActionTypes, SinglePostActionTypes } from '../action-types';
import { SinglePostInterfaces, PostsInterfaces } from '../actions';
import { Post } from '../../api/api-data-interfaces';
import { NavigateFunction } from 'react-router-dom';

export const getPost = (id: string) => {
  return async (dispatch: Dispatch<SinglePostInterfaces>) => {
    dispatch({ type: SinglePostActionTypes.POST_LOAD_REQUEST });

    try {
      const { data } = await mySocialAPi.get<Post>(`/posts/${id}`);

      dispatch({
        type: SinglePostActionTypes.POST_LOAD_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: SinglePostActionTypes.POST_LOAD_FAIL,
        payload: message,
      });
    }
  };
};

export const createPost = (
  token: string,
  img: File,
  title: string,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<SinglePostInterfaces>) => {
    dispatch({ type: SinglePostActionTypes.POST_CREATE_REQUEST });

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

      const { data } = await mySocialAPi.post<Post>(
        `/createpost`,
        {
          imgUrl: url,
          title,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: SinglePostActionTypes.POST_CREATE_SUCCESS,
        payload: data,
      });

      navigate(`/posts/${data._id}`);
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: SinglePostActionTypes.POST_CREATE_FAIL,
        payload: message,
      });
    }
  };
};

export const commentPost = (token: string, text: string, postId: string) => {
  return async (dispatch: Dispatch<SinglePostInterfaces>) => {
    dispatch({ type: SinglePostActionTypes.POST_COMMENT_REQUEST });

    try {
      const { data } = await mySocialAPi.put<Post>(
        `/comment`,
        {
          text,
          postId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: SinglePostActionTypes.POST_COMMENT_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: SinglePostActionTypes.POST_COMMENT_FAIL,
        payload: message,
      });
    }
  };
};

export const likePost = (token: string, postId: string) => {
  return async (dispatch: Dispatch<SinglePostInterfaces | PostsInterfaces>) => {
    dispatch({ type: SinglePostActionTypes.POST_LIKE_REQUEST });

    try {
      const { data } = await mySocialAPi.put<Post>(
        `/like`,
        {
          postId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: SinglePostActionTypes.POST_LIKE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: PostsActionTypes.POSTS_LIKES_UPDATE,
        payload: data,
      });
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: SinglePostActionTypes.POST_LIKE_FAIL,
        payload: message,
      });
    }
  };
};

export const unlikePost = (token: string, postId: string) => {
  return async (dispatch: Dispatch<SinglePostInterfaces | PostsInterfaces>) => {
    dispatch({ type: SinglePostActionTypes.POST_UNLIKE_REQUEST });

    try {
      const { data } = await mySocialAPi.put<Post>(
        `/unlike`,
        {
          postId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: SinglePostActionTypes.POST_UNLIKE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: PostsActionTypes.POSTS_LIKES_UPDATE,
        payload: data,
      });
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: SinglePostActionTypes.POST_UNLIKE_FAIL,
        payload: message,
      });
    }
  };
};

export const deletePost = (token: string, postId: string) => {
  return async (dispatch: Dispatch<SinglePostInterfaces | PostsInterfaces>) => {
    dispatch({ type: SinglePostActionTypes.POST_DELETE_REQUEST });

    try {
      await mySocialAPi.delete<Post>(`deletepost/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({
        type: SinglePostActionTypes.POST_DELETE_SUCCESS,
      });

      dispatch({
        type: PostsActionTypes.POSTS_DELETE,
        payload: postId,
      });
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: SinglePostActionTypes.POST_DELETE_FAIL,
        payload: message,
      });
    }
  };
};

export const resetPost = (): SinglePostInterfaces => {
  return {
    type: SinglePostActionTypes.POST_RESET,
  };
};
