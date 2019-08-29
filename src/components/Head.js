import React from 'react';
import styled from 'styled-components';

const Head = ({ tag }) => (
  <Wrapper>
    Qiitaの記事タグ「{tag}」の詳細情報
  </Wrapper>
);

const Wrapper = styled.h1`
  // styleのため省略
`;

export default Head;
