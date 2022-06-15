import { User } from '../../api/api-data-interfaces';
import { ProfilesInterfaces } from '../actions';
import { ProfilesActionTypes } from '../action-types';

interface ProfilesState {
  profiles: User[];
  loading: boolean;
  error: string;
}

const initialState: ProfilesState = {
  profiles: [],
  loading: false,
  error: '',
};

export const profilesReducer = (
  state: ProfilesState = initialState,
  action: ProfilesInterfaces
): ProfilesState => {
  switch (action.type) {
    case ProfilesActionTypes.PROFILES_REQUEST:
      return { loading: true, error: '', profiles: [] };
    case ProfilesActionTypes.PROFILES_SUCCESS:
      return { loading: false, error: '', profiles: action.payload };
    case ProfilesActionTypes.PROFILES_FAIL:
      return { loading: false, error: action.payload, profiles: [] };
    case ProfilesActionTypes.PROFILES_RESET:
      return initialState;
    default:
      return state;
  }
};
