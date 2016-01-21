import * as types from 'ExpHub/constants/actionTypes.js';

const initialState = {
  instance: null,
  repoInput: 'facebook/react-native',
  isLoading: false,
  comments: {},
  animatingToComments: false,
  animatingToIssues: false,
  commentInput: '',
  user: {}
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ANIMATION_FINISHED:
      return {
        ...state,
        [action.key]: false
      }

    case types.COMMENT_CHANGED:
      return {
        ...state,
        commentInput: action.comment
      }

    case types.COMMENTS_FETCHED:
      return {
        ...state,
        selectedComments: action.comments,
        comments: Object.assign({},
          state.comments,
          {[action.issue.number]: action.comments}
        )
      }

    case types.FETCH_ISSUES:
      return {
        ...state,
        isLoading: true
      }

    case types.INIT_INSTANCE:
      return {
        ...state,
        instance: action.instance
      };

    case types.ISSUES_FETCHED:
      return {
        ...state,
        issues: action.issues,
        currentRepo: action.repoName,
        comments: {},
        selectedIssue: null,
        selectedComments: null,
        isLoading: false
      }

    case types.LEAVE_ISSUE:
      return {
        ...state,
        selectedComments: null,
        selectedIssue: null,
        animatingToIssues: true,
        currentComment: ''
      }

    case types.PASSWORD_CHANGED:
      return {
        ...state,
        userError: null,
        user: {
          ...state.user,
          password: action.password
        }
      }

    case types.REPO_INPUT_CHANGED:
      return {
        ...state,
        repoInput: action.repoInput,
        repoInputError: null
      }

    case types.REPO_INPUT_ERROR:
      return {
        ...state,
        repoInputError: action.message,
        isLoading: false
      }

    case types.SELECT_ISSUE:
      return {
        ...state,
        selectedIssue: action.issue,
        isLoadingComments: true,
        animatingToComments: true
      }

    case types.USER_INPUT_ERROR:
      return {
        ...state,
        userError: action.message
      }

    case types.USER_SIGNED_IN:
      return {
        ...state,
        user: {
          ...state.user,
          signedIn: true
        },
        userInstance: action.userInstance
      }

    case types.USERNAME_CHANGED:
      return {
        ...state,
        userError: null,
        user: {
          ...state.user,
          username: action.username
        }
      }

    default:
      return state;
  }
}