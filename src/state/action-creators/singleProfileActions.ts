import { Dispatch } from 'redux';

import { mySocialAPi } from '../../api';
import { SingleProfileActionTypes } from '../action-types';
import { SingleProfilesInterfaces } from '../actions';
import { User, Post } from '../../api/api-data-interfaces';

export const getProfile = (id: string) => {
  return async (dispatch: Dispatch<SingleProfilesInterfaces>) => {
    dispatch({
      type: SingleProfileActionTypes.PROFILE_REQUEST,
    });

    try {
      const { data } = await mySocialAPi.get<{ user: User; posts: Post[] }>(
        `/user/${id}`
      );

      dispatch({
        type: SingleProfileActionTypes.PROFILE_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      const message =
        JSON.parse(err.request.response) ||
        'unknown error, please try refreshing page or contact admin';
      dispatch({
        type: SingleProfileActionTypes.PROFILE_FAIL,
        payload: message,
      });
    }
  };
};

export const profileReset = (): SingleProfilesInterfaces => {
  return {
    type: SingleProfileActionTypes.PROFILE_RESET,
  };
};
