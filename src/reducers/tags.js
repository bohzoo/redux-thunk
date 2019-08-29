import * as Actions from '../actions';

function selectedTag(state = '', action) {
  switch (action.type) {
    case Actions.SELECT_TAG:
      return action.payload.tag;
    default:
      return state;
  }
}
// タグの取得が完了したかどうかを判定する。通常はページリロード時にだけタグをfetchする
function tagsIsFetching(state = false, action) {
  switch (action.type) {
    case Actions.REQUEST_TAGS:
      return true;
    default:
      return false;
  }
}
// タグの取得に失敗したらエラー(true)とエラー内容を返す
function tagsIsError(state = {status: false, error: null}, action) {
  switch (action.type) {
    case Actions.FAIL_REQUEST_TAGS:
      return {
        ...state,
        status: true,
        error: action.payload.error
      };
    default:
      return {
        ...state,
        status: false,
        error: null
      };
  }
}

/**
 * タグ一覧 のstateを管理するReducer
 */
export default function tags(state = {
  tagAll: [],         // 取得したタグを格納する
  isFetching: false,  // タグ取得のAPIを投げて現在フェッチ中ならtrue
  isError: {
    status: false,
    error: null
  },
  selectedTag: ''     // 選択したタグを格納する
}, action) {
  switch (action.type) {
    case Actions.REQUEST_TAGS:
      return {
        ...state,
        isFetching: tagsIsFetching(state.isFetching, action)
      };
    case Actions.RECEIVE_TAGS:
      return {
        ...state,
        tagAll: action.payload.response,
        isFetching: tagsIsFetching(state.isFetching, action)
      };
    case Actions.SELECT_TAG:
      return {
        ...state,
        selectedTag: selectedTag(state.selectedTag, action)
      };
    case Actions.FAIL_REQUEST_TAGS:
      return {
        ...state,
        isError: tagsIsError(state.isError, action),
        isFetching: tagsIsFetching(state.isFetching, action)
      };
    default:
      return state;
  }
}
