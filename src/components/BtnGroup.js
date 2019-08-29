import React, { Component } from 'react';
import styled from 'styled-components';
import Btn from './Btn';
import {
  fetchTags,
  selectTag,
  fetchTagDataIfNeeded,
} from '../actions';

class BtnGroup extends Component {
  constructor(props) {
    super(props);
    // このコンポーネント内で定義したハンドラーを使用するためにbindする必要がある
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTags());
  }

  handleClick(tag) {
    const { dispatch } = this.props;
    // handleClickが呼び出されたらselectTagアクションとfetchTagDataIfNeededがstoreに送られる
    dispatch(selectTag(tag));
    dispatch(fetchTagDataIfNeeded(tag));
  }

  render() {
    const { tagAll, isFetching, isError } = this.props;
    return (
      <Wrapper>
        {/* isFetchingがtrueならこちらが実行される */}
        {isFetching &&
          <Message>Now Loading...</Message>
        }
        {/* isError.statusがtrueならこちらが実行される */}
        {isError.status &&
          <Message>{isError.error.message}</Message>
        }
        {/* tagAll.lengthが正ならこれが実行される */}
        {tagAll.length > 0 &&
          <React.Fragment>
            <ListHead>タグ：</ListHead>
            <ListWrapper>
              {tagAll.map(tag => <Btn key={tag} tag={tag} onClick={this.handleClick}>{tag}</Btn>)}
            </ListWrapper>
          </React.Fragment>
        }
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  // styleのため省略
  width: 1000px;
  margin: 0 auto;
`;

const Message = styled.p`
  // styleのため省略
`;

const ListWrapper = styled.ul`
  // styleのため省略
  display: flex;
  justify-content: flex-start;
  list-style-type: none;
`;

const ListHead = styled.h2`
  // styleのため省略
`

export default BtnGroup;
