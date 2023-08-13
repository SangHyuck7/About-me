import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";

import HeaderTitle from "./HeaderTitle";
import SearchCard from "./SearchCard";
import TimeMode from "./TimeMode";
import ErrorPage from "./ErrorPage";

import animationData from "./data/handShake.json";

import {
  NIGHT_FIRSTTITLE_COLOR,
  NIGHT_MAINCONTAINER_COLOR,
  NIGHT_INPUTCONTAINER_COLOR,
  NIGHT_INPUTBORDER_COLOR,
  NIGHT_FOOTERTEXT_COLOR,
  NIGHT_INPUTTEXT_COLOR,
  DAY_MAINCONTAINER_COLOR,
  DAY_FIRSTTITLE_COLOR,
  DAY_INPUTBORDER_COLOR,
  DAY_HELPCIRCLE_COLOR,
  NIGHT_HEADERBORDER_COLOR,
  NIGHT_AICONTAINER_COLOR,
  DAY_AICONTAINER_COLOR,
} from "./constants/color";

function App() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [searchContentArr, setSearchContentArr] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const [prevSearchContent, setPrevSearchContent] = useState("");
  const [isTypingHalted, setIsTypingHalted] = useState(false);

  const scrollContainerRef = useRef(null);

  const handleAnimationComplete = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 7) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [searchContentArr]);

  function handleSetIsDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  function handleSetIsTypingHalted() {
    setIsTypingHalted(false);
  }

  const handleSetIsStop = useCallback(() => {
    setIsStop((prevIsStop) => !prevIsStop);
  }, []);

  function addSearchContent(Content) {
    if (Content.length !== 0) {
      setSearchContentArr([...searchContentArr, Content]);
    }
  }

  function toggleButton() {
    if (searchContent.length !== 0 && !isSearch) {
      setIsSearch(true);
    }
  }

  function onClickStopButton() {
    if (!isStop) {
      addSearchContent(prevSearchContent);
    } else {
      setIsTypingHalted(true);
      setIsStop(false);
    }
  }

  return (
    <>
      <ErrorContainer>
        <ErrorPage isDarkMode={isDarkMode}></ErrorPage>
      </ErrorContainer>
      <Container isDarkMode={isDarkMode}>
        <TimeMode
          isDarkMode={isDarkMode}
          handleSetIsDarkMode={handleSetIsDarkMode}
        />
        {isSearch ? (
          <HeaderTitle isDarkMode={isDarkMode} />
        ) : (
          <>
            <Title isDarkMode={isDarkMode}>Meet Lee Sang Hyuk!</Title>
            <StyledLottie animationData={animationData} />
          </>
        )}
        {isSearch && (
          <ScrollContainer ref={scrollContainerRef} isDarkMode={isDarkMode}>
            {searchContentArr.map((content, index) => (
              <SearchCard
                key={index}
                content={content}
                marginTop={index === 0 ? "72px" : "0"}
                onAnimationComplete={handleAnimationComplete}
                isDarkMode={isDarkMode}
                handleSetIsStop={handleSetIsStop}
                handleSetIsTypingHalted={handleSetIsTypingHalted}
                isTypingHalted={isTypingHalted}
              />
            ))}
          </ScrollContainer>
        )}
        <InputContainer isDarkMode={isDarkMode}>
          <InputField
            isDarkMode={isDarkMode}
            placeholder="Let's find something!"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                toggleButton();
                addSearchContent(searchContent);
                setPrevSearchContent(searchContent);
                setSearchContent("");
              }
            }}
            disabled={isStop}
          />
          <SendButton
            isDarkMode={isDarkMode}
            disabled={isStop}
            type="button"
            onClick={() => {
              toggleButton();
              addSearchContent(searchContent);
              setPrevSearchContent(searchContent);
              setSearchContent("");
            }}
          >
            <SendIcon />
          </SendButton>
        </InputContainer>
        <FooterText isDarkMode={isDarkMode}>
          Get to know Lee Sang Hyuk! Find your search keywords on the tooltip
          icon.
        </FooterText>
        {isSearch && (
          <StopButton
            isDarkMode={isDarkMode}
            onClick={() => {
              onClickStopButton();
            }}
          >
            {isStop ? "Stop Writing" : "Rewrite"}
          </StopButton>
        )}
        <HelpCircle
          isDarkMode={isDarkMode}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ?
          {showTooltip && (
            <Tooltip>
              <HeadTextLine>
                궁금한 부분을 아래 키워드로 검색해 주세요!
              </HeadTextLine>
              <TextLine>• Contact or 연락처</TextLine>
              <TextLine>• Introduce or 소개</TextLine>
              <TextLine>• Personal projects or 개인 프로젝트</TextLine>
              <TextLine>• Team projects or 팀 프로젝트</TextLine>
              <TextLine>• Education or 교육</TextLine>
              <TextLine>• All contents or 모든 콘텐츠</TextLine>
              <TextLine>• Resume or 이력서</TextLine>
            </Tooltip>
          )}
        </HelpCircle>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_MAINCONTAINER_COLOR : DAY_MAINCONTAINER_COLOR};
  position: fixed;
  top: 0;
  left: 0;

  @media (max-width: 360px) {
    display: none;
  }
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  @media (max-width: 360px) {
    display: block;
  }
`;

const Title = styled.h1`
  color: ${(props) =>
    props.isDarkMode ? NIGHT_FIRSTTITLE_COLOR : DAY_FIRSTTITLE_COLOR};
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-40%, -50%);

  @media (min-width: 0px) and (max-width: 425px) {
    font-size: 18px;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 22px;
  }
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_INPUTCONTAINER_COLOR : DAY_MAINCONTAINER_COLOR};
  border: ${(props) =>
    props.isDarkMode
      ? `1px solid ${NIGHT_INPUTBORDER_COLOR}`
      : `1px solid ${DAY_INPUTBORDER_COLOR}`};
  border-radius: 15px;

  @media (min-width: 0px) and (max-width: 425px) {
    bottom: 6%;
    height: 30px;
  }
`;

const SendButton = styled.button`
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_INPUTCONTAINER_COLOR : DAY_MAINCONTAINER_COLOR};
  padding: 0;
  border: none;
  width: 50px;
  height: 40px;
  border-radius: 0 15px 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 425px) {
    height: 30px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    height: 40px;
  }
`;

const SendIcon = styled.div`
  background: url("/send-icon.png") no-repeat center center;
  background-size: cover;
  width: 30px;
  height: 30px;

  @media (min-width: 0px) and (max-width: 425px) {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const InputField = styled.input`
  width: calc(100% - 40px);
  height: 40px;
  padding: 0 10px;
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 15px 0 0 15px;
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_INPUTCONTAINER_COLOR : DAY_MAINCONTAINER_COLOR};
  color: ${(props) => (props.isDarkMode ? NIGHT_INPUTTEXT_COLOR : "black")};

  @media (min-width: 0px) and (max-width: 425px) {
    height: 30px;
    font-size: 13px;
  }

  @media (min-width: 426px) and (max-width: 949px) {
    height: 40px;
    font-size: 15px;
  }
`;

const HelpCircle = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 40px;
  height: 40px;
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_INPUTCONTAINER_COLOR : DAY_HELPCIRCLE_COLOR};
  border: ${(props) =>
    props.isDarkMode
      ? `2px solid ${NIGHT_INPUTBORDER_COLOR}`
      : `2px solid ${NIGHT_FOOTERTEXT_COLOR}`};
  font-weight: 800;
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 425px) {
    bottom: 6%;
    width: 30px;
    height: 30px;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    bottom: 5%;
    width: 40px;
    height: 40px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: -670%;
  right: 0;
  padding: 20px;
  background-color: black;
  color: white;
  border-radius: 15px;
  font-size: 15px;
  white-space: nowrap;

  @media (min-width: 0px) and (max-width: 425px) {
    font-size: 10px;
    top: -740%;
  }

  @media (min-width: 426px) and (max-width: 1024px) {
    font-size: 13px;
    top: -630%;
  }
`;

const HeadTextLine = styled.div`
  margin-bottom: 20px;
`;

const TextLine = styled.div`
  margin-top: 10px;
`;

const ScrollContainer = styled.div`
  max-height: 83%;
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom: ${(props) =>
    props.isDarkMode
      ? `2px solid ${NIGHT_HEADERBORDER_COLOR}`
      : `2px solid ${DAY_INPUTBORDER_COLOR}`};

  @media (min-width: 0px) and (max-width: 425px) {
    max-height: 84%;
  }
`;

const FooterText = styled.p`
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
  color: ${NIGHT_FOOTERTEXT_COLOR};
  color: ${(props) =>
    props.isDarkMode ? NIGHT_FOOTERTEXT_COLOR : NIGHT_INPUTBORDER_COLOR};
  text-align: center;
  font-size: 15px;

  @media (min-width: 0px) and (max-width: 425px) {
    font-size: 10px;
  }

  @media (min-width: 426px) and (max-width: 949px) {
    font-size: 12px;
  }
`;

const StyledLottie = styled(Lottie)`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -75%);

  @media (min-width: 0px) and (max-width: 489px) {
    top: 60%;
  }

  @media (min-width: 490px) and (max-width: 768px) {
    top: 68%;
  }
`;

const StopButton = styled.button`
  position: absolute;
  bottom: 11%;
  right: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  font-size: 15px;
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_INPUTCONTAINER_COLOR : DAY_MAINCONTAINER_COLOR};
  border: ${(props) =>
    props.isDarkMode
      ? `2px solid ${NIGHT_INPUTBORDER_COLOR}`
      : `2px solid ${DAY_INPUTBORDER_COLOR}`};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.isDarkMode ? NIGHT_AICONTAINER_COLOR : DAY_AICONTAINER_COLOR};
  }

  @media (min-width: 0px) and (max-width: 425px) {
    height: 30px;
    font-size: 13px;
  }
`;

export default App;
