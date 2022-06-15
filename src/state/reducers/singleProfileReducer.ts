import { User, Post } from '../../api/api-data-interfaces';
import { SingleProfilesInterfaces } from '../actions';
import { SingleProfileActionTypes } from '../action-types';

interface SingleProfilesState {
  profile: {
    user: User;
    posts: Post[];
  } | null;
  loading: boolean;
  error: string;
}

const initialState: SingleProfilesState = {
  profile: null,
  loading: false,
  error: '',
};

export const singleProfileReducer = (
  state: SingleProfilesState = initialState,
  action: SingleProfilesInterfaces
): SingleProfilesState => {
  switch (action.type) {
    case SingleProfileActionTypes.PROFILE_REQUEST:
      return { loading: true, error: '', profile: null };
    case SingleProfileActionTypes.PROFILE_SUCCESS:
      return { loading: false, error: '', profile: action.payload };
    case SingleProfileActionTypes.PROFILE_FAIL:
      return { loading: false, error: action.payload, profile: null };
    case SingleProfileActionTypes.PROFILE_RESET:
      return initialState;
    default:
      return state;
  }
};
