# Stateの形
```json
{
  // タグ取得に関するstate
  tags: {
    tagAll: ['react', 'vue', 'angular'],
    isFetching: false,
    isError: {
      status: false,
      error: null
    },
    selectedTag: 'react',
  },

  // タグの詳細情報に関するstate
  tagDatas: {
    react: {
      isFetching: false,
      isError: {
        status: false,
        error: null
      },
      shouldUpdate: false,
      lastUpdated: 137983721
      responseData: {
        "followers_count": 298,
        "icon_url": "https://s3-ap-northeast-1.amazonaws.com/qiita-tag-image/e6867d326364bb2498f72f152c92408bf457de8c/medium.jpg?1426679594",
        "id": "react.js",
        "items_count": 262
      }
    }
  }
}

/**
 * 初期stateはこんな感じ
 */
{
  tags: {
    tagAll: [],
    isFetching: false,
    isError: {
      status: false,
      error: null
    },
    selectedTag: ''
  },
  tagDatas: {}
}
```

## まとめ
- Redux のミドルウェアである Redux-thunk を使うと非同期の Action も処理できる
- Redux-thunkを使うと、ただのオブジェクトではなく、dispatch と getState を引数に取る関数を返す Action Creator （Thunk）を作ることができる
  - 返された関数は Redux-thunk のミドルウェアによって実行される
  - この関数は非同期のAPIコールなどの副作用を持たせることができる（純粋関数でなくて良い）
  - この関数は任意のタイミングで Action を dispatch することができる
  - Thunk の中から Thunk を dispatch することができる
  - 最終的に Actionをdispatch できれば state が更新される原則は変わらない
- 実装に進む前に State の形を考えた方がスムーズ
- APIなどの非同期通信の場合、3つの Action を用意する
  - リクエスト開始の Action
  - レスポンス受け取り（リクエスト成功）の Action
  - リクエスト失敗の Action
- Reducer は 適度に分割して Reducer合成を行った方が見やすくなる
- Redux-logger は、applyMiddleware() の最後に渡した方が良い
