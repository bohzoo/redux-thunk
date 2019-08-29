import * as Actions from '../actions';

function tagData(state = {
  isFetching: false,
  isError: {
    status: false,
    error: null
  },
  shouldUpdate: false,
  responseData: {}
}, action) {
  switch (action.type) {
    case Actions.REQUEST_TAG_DATA:
      return {
        ...state,
        isFetching: true,
        // このアクションが働いたということは新しいタグ情報を取得したことになるので、これはfalse
        shouldUpdate: false
      };
      // 非同期通信によってタグの詳細情報の取得が成功したら、タグとその詳細情報のjsonを格納する
    case Actions.RECEIVE_TAG_DATA:
      return {
        ...state,
        isFetching: false,
        // このアクションが働く前にエラー情報が格納されているかもしれないので、エラー情報を空にする
        isError: {
          status: false,
          error: null
        },
        lastUpdate: Date.now(),
        responseData: action.payload.response
      };
    // タグの採用見込みボタンが押されたら実行
    case Actions.REFRESH_TAG_DATA:
      return {
        ...state,
        shouldUpdate: true
      };
      // タグ情報の取得に失敗したらエラー内容を返す
    case Actions.FAIL_REQUEST_TAG_DATA:
      return {
        ...state,
        isFetching: false,
        isError: {
          status: true,
          error: action.payload.error
        }
      };
    default:
      return state;
  }
}

/**
 * タグの詳細情報を管理するReducer
 */
// tagData関数でstateの初期値が定義されており、どのアクションでもtagData関数が呼び出されるので、ここでのstateの初期値は空でよい
export default function tagDatas(state = {}, action) {
  // 順番に実行される。breakがないから全てのcaseを経由する
  switch (action.type) {
    case Actions.REQUEST_TAG_DATA:        // 選択したタグ名を受け取り
    case Actions.RECEIVE_TAG_DATA:        // そのタグ情報を取得
    case Actions.REFRESH_TAG_DATA:        // 再読み込みボタンが押されたら実行
    case Actions.FAIL_REQUEST_TAG_DATA:   // タグ情報の取得でエラーがあるならエラー情報を上書き
      return {
        ...state,
        [action.payload.tag]: tagData(state[action.payload.tag], action)
      };
    default:
      return state;
  }
}
