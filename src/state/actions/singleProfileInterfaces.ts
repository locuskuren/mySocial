import { User, Post } from '../../api/api-data-interfaces';
import { SingleProfileActionTypes } from '../action-types';

interface SingleProfileRequest {
  type: SingleProfileActionTypes.PROFILE_REQUEST;
}

interface SingleProfileSucess {
  type: SingleProfileActionTypes.PROFILE_SUCCESS;
  payload: { user: User; posts: Post[] };
}

interface SingleProfileFail {
  type: SingleProfileActionTypes.PROFILE_FAIL;
  payload: string;
}

interface SingleProfileReset {
  type: SingleProfileActionTypes.PROFILE_RESET;
}

export type SingleProfilesInterfaces =
  | SingleProfileRequest
  | SingleProfileSucess
  | SingleProfileFail
  | SingleProfileReset;
