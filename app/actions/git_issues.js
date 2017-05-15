import * as types from './types';
import Api from '../lib/api';

export function fetchGitIssues(repo) {
  return (dispatch, getState) => {
    console.log(getState());
    const params = [];
    console.log(repo);
    return Api.get(`${repo}/issues`).then( (resp) => {
      console.log("Response"); 
      console.log(resp); 
      dispatch(setSearchedIssues({issues: resp}));
    }).catch( (exp) =>{
      console.log(exp);
      dispatch(setSearchedIssues({issues: []}));
    });
  }
}

export function setSearchedIssues({issues}) {
  return {
    type: types.SET_SEARCHED_ISSUES,
    issues
  }
}

export function addIssue() {
  return {
    type: types.ADD_ISSUE
  };
}
