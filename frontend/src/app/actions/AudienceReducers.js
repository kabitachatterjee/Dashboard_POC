import {
  REQUEST_AUDIENCES,
  RECEIVE_AUDIENCES,
  EDIT_AUDIENCE,
  RECEIVE_DELETE_AUDIENCE,
} from './AudienceAction'

export function audiences(state = {
  audienceData: [],
  isFetching: false
}, action) {
  switch (action.type) {
    case REQUEST_AUDIENCES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_AUDIENCES:
      return Object.assign({}, state, {
        audienceData: action.audiences,
        isFetching: false,
      });
    case EDIT_AUDIENCE:
    case RECEIVE_DELETE_AUDIENCE:
      return Object.assign(
        {},
        state,
        audiences(state[action.category], action),
      );
    default:
      return state
  }
}
