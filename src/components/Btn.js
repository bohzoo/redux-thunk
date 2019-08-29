import React from 'react';
import styled from 'styled-components';

const Btn = ({ tag, children, onClick }) => {
  const handleClick = () => onClick(tag);
  return (
    <Wrapper>
      <ItemWrapper onClick={handleClick}>{children}</ItemWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  margin-right: 30px;
`;

const ItemWrapper = styled.button`
  // styleのため省略
`;

export default Btn;
