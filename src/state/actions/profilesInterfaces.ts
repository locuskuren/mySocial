import { User } from '../../api/api-data-interfaces';
import { ProfilesActionTypes } from '../action-types';

interface ProfilesRequest {
  type: ProfilesActionTypes.PROFILES_REQUEST;
}

interface ProfilesSucess {
  type: ProfilesActionTypes.PROFILES_SUCCESS;
  payload: User[];
}

interface ProfilesFail {
  type: ProfilesActionTypes.PROFILES_FAIL;
  payload: string;
}

interface ProfilesReset {
  type: ProfilesActionTypes.PROFILES_RESET;
}

export type ProfilesInterfaces =
  | ProfilesRequest
  | ProfilesSucess
  | ProfilesFail
  | ProfilesReset;
