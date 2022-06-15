import { AuthUser } from '../../api/api-data-interfaces';
import { UserInterfaces } from '../actions';
import { UserActionTypes } from '../action-types';

interface UserState {
  currentUser: AuthUser | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: '',
};

export const userReducer = (
  state: UserState = initialState,
  action: UserInterfaces
): UserState => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_REQUEST:
      return { loading: true, error: '', currentUser: null };
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case UserActionTypes.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.USER_ERROR_RESET:
      return { ...state, loading: false, error: '' };
    case UserActionTypes.USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: '' };
    case UserActionTypes.USER_REGISTER_SUCCESS:
      return state;
    case UserActionTypes.USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.USER_FOLLOW_REQUEST:
      return { ...state, loading: true, error: '' };
    case UserActionTypes.USER_FOLLOW_SUCESS:
      return {
        ...state,
        loading: false,
        currentUser: {
          token: state.currentUser?.token || '',
          user: action.payload,
        },
      };
    case UserActionTypes.USER_FOLLOW_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.USER_UNFOLLOW_REQUEST:
      return { ...state, loading: true, error: '' };
    case UserActionTypes.USER_UNFOLLOW_SUCESS:
      return {
        ...state,
        loading: false,
        currentUser: {
          token: state.currentUser?.token || '',
          user: action.payload,
        },
      };
    case UserActionTypes.USER_UNFOLLOW_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.USER_UPDATE_PIC_REQUEST:
      return { ...state, loading: true, error: '' };
    case UserActionTypes.USER_UPDATE_PIC_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: {
          token: state.currentUser?.token || '',
          user: action.payload,
        },
      };

    case UserActionTypes.USER_UPDATE_PIC_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
