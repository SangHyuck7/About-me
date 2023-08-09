import React from "react";
import styled from "styled-components";

function HeaderTitle() {
  return (
    <Container>
      <Title>Hi my name is Lee Sang Hyuk😃</Title>
    </Container>
  );
}

export default HeaderTitle;

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px 0;
  background-color: #343541;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #2a2b32;
  z-index: 999;
`;

const Title = styled.h1`
  color: #d9d9e3;
  font-size: 20px;
`;
