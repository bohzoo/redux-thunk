import React from 'react';
import styled from 'styled-components';

const RefreshLink = ({ onClick }) => (
  <Wrapper href="#" onClick={onClick}>再読み込み</Wrapper>
);

const Wrapper = styled.a`
  // styleのため省略
`;

export default RefreshLink;
