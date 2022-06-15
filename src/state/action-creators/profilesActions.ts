import { Dispatch } from 'redux';

import { mySocialAPi } from '../../api';
import { ProfilesActionTypes } from '../action-types';
import { ProfilesInterfaces } from '../actions';
import { User } from '../../api/api-data-interfaces';

export const searchProfilesStart = (): ProfilesInterfaces => {
  return {
    type: ProfilesActionTypes.PROFILES_REQUEST,
  };
};

export const searchProfiles = (searchterm: string) => {
  return async (dispatch: Dispatch<ProfilesInterfaces>) => {
    try {
      const { data } = await mySocialAPi.get<User[]>('/allusers');

      let users: User[] = [];

      if (searchterm !== '') {
        users = data.filter((user) => user.name.includes(searchterm));
      }

      dispatch({
        type: ProfilesActionTypes.PROFILES_SUCCESS,
        payload: users,
      });
    } catch (err: any) {
      const message = 'unknown error, please try again or contact admin';
      dispatch({
        type: ProfilesActionTypes.PROFILES_FAIL,
        payload: message,
      });
    }
  };
};

export const searchProfilesReset = (): ProfilesInterfaces => {
  return {
    type: ProfilesActionTypes.PROFILES_RESET,
  };
};
