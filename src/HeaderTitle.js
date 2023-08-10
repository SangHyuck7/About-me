import React from "react";
import styled from "styled-components";

import {
  NIGHT_MAINCONTAINER_COLOR,
  NIGHT_HEADERBORDER_COLOR,
  NIGHT_FOOTERTEXT_COLOR,
  DAY_MAINCONTAINER_COLOR,
  DAY_INPUTBORDER_COLOR,
  NIGHT_FIRSTTITLE_COLOR,
} from "./constants/color";

function HeaderTitle({ isDarkMode }) {
  return (
    <Container isDarkMode={isDarkMode}>
      <Title isDarkMode={isDarkMode}>Hi my name is Lee Sang Hyuk😃</Title>
    </Container>
  );
}

export default HeaderTitle;

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px 0;
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_MAINCONTAINER_COLOR : DAY_MAINCONTAINER_COLOR};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid ${NIGHT_HEADERBORDER_COLOR};
  border: ${(props) =>
    props.isDarkMode
      ? `2px solid ${NIGHT_HEADERBORDER_COLOR}`
      : `2px solid ${DAY_INPUTBORDER_COLOR}`};
`;

const Title = styled.h1`
  color: ${(props) =>
    props.isDarkMode ? NIGHT_FOOTERTEXT_COLOR : NIGHT_FIRSTTITLE_COLOR};
  font-size: 20px;
`;
