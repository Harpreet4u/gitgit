import createReducer from '../lib/createReducer';
import * as types from '../actions/types';


export const searchedIssues = createReducer({}, {
  [types.SET_SEARCHED_ISSUES](state, action) {
    let newState = {};
      action.issues.forEach( (issue) => {
        newState[issue.id] = issue
      });
    return newState;
  }
});

export const issueCount = createReducer(0, {
  [types.SET_SEARCHED_ISSUES](state, action) {
    return action.issues.length;
  },
  [types.ADD_ISSUE](state, action) {
    return state+1;
  }
});
