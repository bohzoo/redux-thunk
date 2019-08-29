import React from 'react';
import styled from 'styled-components';

const Details = ({ followers_count, icon_url, items_count }) => (
  <Wrapper>
    <ItemWrapper>フォロワー数： {followers_count}</ItemWrapper>
    <ItemWrapper>アイコン画像： <Img src={icon_url} /></ItemWrapper>
    <ItemWrapper>記事数： {items_count}</ItemWrapper>
  </Wrapper>
);

const Wrapper = styled.ul`
  // styleのため省略
`;

const ItemWrapper = styled.li`
  // styleのため省略
`;

const Img = styled.img`
  // styleのため省略
`;

export default Details;
