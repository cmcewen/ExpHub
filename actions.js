import Github from 'github-api'

import token from 'ExpHub/constants/githubToken.js';
import * as types from 'ExpHub/constants/actionTypes.js';

export function addComment() {
  return (dispatch, getState) => {
    let splitName = getState().currentRepo.split("/");
    let instance = getState().instance;
    let issue = getState().selectedIssue;
    let issues = instance.getIssues(splitName[0], splitName[1])
    let comment = getState().commentInput
    issues.comment(issue, comment, (err, comments) => {
      dispatch({
        type: types.COMMENT_ADDED,
        issue,
        comment
      })
      fetchComments(issue)(dispatch, getState)
    })
  }
}

export function animationFinished(key) {
  return (dispatch, getState) => {
    dispatch({
      type: types.ANIMATION_FINISHED,
      key
    })
  }
}

export function changeComment(comment) {
  return (dispatch, getState) => {
    dispatch({
      type: types.COMMENT_CHANGED,
      comment
    })
  }
}

export function changePassword(password) {
  return (dispatch, getState) => {
    dispatch({
      type: types.PASSWORD_CHANGED,
      password
    })
  }
}

export function changeRepoInput(repoInput) {
  return (dispatch, getState) => {
    dispatch({
      type: types.REPO_INPUT_CHANGED,
      repoInput
    })
  }
}

export function changeUsername(username) {
  return (dispatch, getState) => {
    dispatch({
      type: types.USERNAME_CHANGED,
      username
    })
  }
}

export function fetchCurrentRepo() {
  return (dispatch, getState) => {
    dispatch({
      type: types.FETCH_ISSUES
    })

    let repoName = getState().repoInput;
    let instance = getState().instance;

    let splitName = repoName.split("/");
    if (splitName.length !== 2) {
      dispatch(inputError("Incorrect repo format - try 'user/repo-name'"))
      return;
    }

    let issues = instance.getIssues(splitName[0], splitName[1])
    issues.list({
      'state': 'open',
      'sort': 'updated'
    }, (err, issues) => {
      if (err) {
        dispatch(inputError("That does not appear to be a valid repo"))
        return;
      }

      dispatch({
        type: types.ISSUES_FETCHED,
        issues,
        repoName
      })
    });
  }
}

export function initRepo() {
  return (dispatch) => {
    let instance = new Github({
      token: token,
      auth: "oauth"
    });
    dispatch({
      type: types.INIT_INSTANCE,
      instance
    })
  }
}

export function leaveIssue(issue) {
  return (dispatch, getState) => {
    dispatch({
      type: types.LEAVE_ISSUE,
      issue
    })
  }
}

export function selectIssue(issue) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SELECT_ISSUE,
      issue
    })
    fetchComments(issue)(dispatch, getState)
  }
}

export function fetchComments(issue) {
  return (dispatch, getState) => {
    let splitName = getState().currentRepo.split("/");
    let instance = getState().instance;
    let issues = instance.getIssues(splitName[0], splitName[1])
    issues.getComments({}, issue, (err, comments) => {
      dispatch({
        type: types.COMMENTS_FETCHED,
        issue,
        comments
      })
    })
  }
}

export function signIn() {
  return (dispatch, getState) => {
    let userInstance = new Github({
      username: getState().user.username,
      password: getState().user.password,
      auth: "basic"
    });

    let repo = userInstance.getRepo('facebook', 'react-native');
    repo.show(function(err, repo) {
      if (err) {
        let message = "Incorrect username or password"
        dispatch({
          type: types.USER_INPUT_ERROR,
          message
        })
      } else {
        dispatch({
          type: types.USER_SIGNED_IN,
          userInstance
        })
      }
    });
  }
}

function inputError(message) {
  return {
    type: types.REPO_INPUT_ERROR,
    message
  }
}