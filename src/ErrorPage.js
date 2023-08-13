import React from "react";
import { styled } from "styled-components";
import Lottie from "lottie-react";

import animationData from "./data/error.json";
import {
  NIGHT_MAINCONTAINER_COLOR,
  DAY_MAINCONTAINER_COLOR,
  NIGHT_FIRSTTITLE_COLOR,
  DAY_FIRSTTITLE_COLOR,
} from "./constants/color";

function ErrorPage({ isDarkMode }) {
  return (
    <Container isDarkMode={isDarkMode}>
      <StyledLottie animationData={animationData}></StyledLottie>
      <Text isDarkMode={isDarkMode}>Screens smaller than 360px</Text>
      <Text isDarkMode={isDarkMode}>are not supported.</Text>
    </Container>
  );
}

export default ErrorPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${NIGHT_MAINCONTAINER_COLOR};
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_MAINCONTAINER_COLOR : DAY_MAINCONTAINER_COLOR};
`;

const StyledLottie = styled(Lottie)`
  width: 100%;
  height: 150px;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) =>
    props.isDarkMode ? NIGHT_FIRSTTITLE_COLOR : DAY_FIRSTTITLE_COLOR};
`;
