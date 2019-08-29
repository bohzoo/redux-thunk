// ReducerのtagsとtagDatasをcombineReducersでまとめるためのReducerを定義する

import { combineReducers } from 'redux';
import tags from './tags';
import tagDatas from './tagDatas';

// ReducerのtagsとtagDatasをcombineReducersでまとめる
const rootReducer = combineReducers({
  tags,
  tagDatas
});

export default rootReducer;
