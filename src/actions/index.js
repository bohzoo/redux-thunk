// QiitaのAPIをインポート
import { API_GENRE, API_QIITA_TAGS } from '../define';
/**
 * Action type
 */
export const REQUEST_TAGS = 'REQUEST_TAGS';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const SELECT_TAG = 'SELECT_TAG';
export const REQUEST_TAG_DATA = 'REQUEST_TAG_DATA';
export const RECEIVE_TAG_DATA = 'RECEIVE_TAG_DATA';
export const REFRESH_TAG_DATA = 'REFRESH_TAG_DATA';
export const FAIL_REQUEST_TAGS = 'FAIL_REQUEST_TAGS';
export const FAIL_REQUEST_TAG_DATA = 'FAIL_REQUEST_TAG_DATA';

/**
 * Action Creator
 */
// ページリロード時にタグ取得用のAPIを投げる
export const requestTags = () => ({
  type: REQUEST_TAGS
});
// タグ取得用APIを投げてタグのjsonデータを受け取る
export const receiveTags = (json) => ({
  type: RECEIVE_TAGS,
  payload: {
    response: json
  }
});
// どのタグのボタンを押したかを格納する
export const selectTag = (tag) => ({
  type: SELECT_TAG,
  payload: {
    tag
  }
});
// タグのボタンを押したらそのタグの詳細情報を取得するAPIを投げる
export const requestTagData = (tag) => ({
  type: REQUEST_TAG_DATA,
  payload: {
    tag
  }
});
// タグの詳細情報を取得したらその情報のjsonデータを格納する
export const receiveTagData = (tag, json) => ({
  type: RECEIVE_TAG_DATA,
  payload: {
    tag,
    response: json
  }
});
// タグの再読み込みボタンを押したらそのタグ名を格納する
// その後requestTagDataとreceiveTagDataを実行する
export const refreshTagData = (tag) => ({
  type: REFRESH_TAG_DATA,
  payload: {
    tag
  }
});
// ページリロード時のタグの取得に失敗したらエラー内容を格納する
export const failRequestTags = (error) => ({
  type: FAIL_REQUEST_TAGS,
  error: true,
  payload: {
    error
  }
});
// ボタンクリックによりタグの詳細情報の取得に失敗したら、タグとエラー内容を格納する
export const failRequestTagData = (tag, error) => ({
  type: FAIL_REQUEST_TAG_DATA,
  error: true,
  payload: {
    tag,
    error
  }
});

/**
 * Thunkによる非同期通信
 * タグ一覧を取得する
 */
export const fetchTags = () => {
  return (dispatch) => {
    // タグの取得を行うために、タグを取得するAPIを投げるアクションをstoreに投げる
    dispatch(requestTags());
    return fetch(API_GENRE)
      // fetchの先頭のthenの引数にはAPI_GENREから返ってきたresponseが入る
      .then(res => {
        if (!res.ok) {
          // rejectはエラーのときに実行し、resolveは成功の時に実行する
          // rejectやresolveの引数が非同期処理の処理結果になる
          return Promise.resolve(new Error(res.statusText));
        }
        return res.json();
      })
      // API_GENREで取得したjsonデータをreceiveTagsに入れてdispatchする
      // このjsonはこれより一つ前のthenの返り値、つまりres.json()が入っている
      // このjsonにはreact, vue, angularが入っている
      .then(json => dispatch(receiveTags(json)))
      // 上のふたつのthenでエラーが起きたらcatchが実行される
      .catch(error => dispatch(failRequestTags(error)));
  }
};

/**
 * Thunkによる非同期通信
 * ボタンクリックによりタグの詳細情報を取得する
 */
// tagにはreactかvueかangularの文字列が入る
const fetchTagData = (tag) => {
  return (dispatch) => {
    // タグの詳細情報を取得するために、タグの詳細情報を取得するAPIを投げるアクションをstoreに投げる
    dispatch(requestTagData(tag));
    // 以下のAPIをfetchするとQittaからタグの情報を入手できる
    return fetch(API_QIITA_TAGS + tag)
      .then(res => {
        if (!res.ok) {
          return Promise.resolve(new Error(res.statusText));
        }
        return res.json();
      })
      .then(json => dispatch(receiveTagData(tag, json)))
      .catch(error => dispatch(failRequestTagData(tag, error)));
  }
}

/**
 * タグの詳細情報を取得するか判定
 * （すでに対象のタグの詳細情報を取得済みであればfalseを返す）
 */
const shouldFetchTagData = (tag, state) => {
  // state内のtagDatas[tag]が存在しないならフェッチすることを許可する(ページリロード時はtagDatas[tag]は空になっている)
  // state内のtagDatas[tag]以下にあるshouldUpdateがtrueであればタグの詳細情報をフェッチすることを許可する
  // タグの詳細情報をフェッチできるのはこのときだけ
  if (state.tagDatas[tag] === undefined || state.tagDatas[tag].shouldUpdate) {
    return true;
  }
  // state内のtagDatas[tag]以下にあるisFetchingがtrueであればタグの詳細情報をフェッチすることを許可しない
  // これは今現在フェッチ中なら再びフェッチしないことを意味する
  if (state.tagDatas[tag].isFetching) {
    return false;
  }
  return false;
};

/**
 * Thunkによる非同期通信
 * タグの詳細情報を必要であれば取得する
 */
export const fetchTagDataIfNeeded = (tag) => {
  return (dispatch, getState) => {
    // フェッチしてもよいならフェッチする
    if (shouldFetchTagData(tag, getState())) {
      return dispatch(fetchTagData(tag));
    }
  }
};
