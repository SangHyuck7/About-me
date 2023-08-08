import React, { useState } from "react";
import styled from "styled-components";

import HeaderTitle from "./HeaderTitle";

function App() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchContent, setSearchContent] = useState("");

  return (
    <Container>
      {isSearch ? <HeaderTitle /> : <Title>Meet Sanghyuk Lee!</Title>}
      <InputContainer>
        <InputField
          placeholder="Let's find something!"
          onChange={(e) => setSearchContent(e.target.value)}
        />
        <SendButton
          type="button"
          onClick={() => {
            setIsSearch(true);
          }}
        >
          <SendIcon />
        </SendButton>
      </InputContainer>
      <HelpCircle
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        ?
        {showTooltip && (
          <Tooltip>
            <HeadTextLine>
              궁금한 부분을 아래 키워드로 검색해 주세요!
            </HeadTextLine>
            <TextLine>Contact or 연락처</TextLine>
            <TextLine>Introduce or 소개</TextLine>
            <TextLine>Personal projects or 개인 프로젝트</TextLine>
            <TextLine>Team projects or 팀 프로젝트</TextLine>
            <TextLine>Education or 교육</TextLine>
            <TextLine>All contents or 모든 콘텐츠</TextLine>
          </Tooltip>
        )}
      </HelpCircle>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #343541;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #565869;
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 5%;
  width: 50%;
  display: flex;
`;

const SendButton = styled.button`
  background-color: #40414f;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 0 15px 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SendIcon = styled.div`
  background: url("/send-icon.png") no-repeat center center;
  background-size: cover;
  width: 30px;
  height: 30px;
`;

const InputField = styled.input`
  width: calc(100% - 40px);
  padding: 15px;
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 15px 0 0 15px;
  background-color: #40414f;
  color: white;
`;

const HelpCircle = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 40px;
  height: 40px;
  background-color: #40414f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 2px solid #565869;
  cursor: pointer;
`;

const Tooltip = styled.div`
  position: absolute;
  top: -670%;
  right: 0;
  padding: 20px;
  background-color: #565869;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  white-space: nowrap;
`;

const HeadTextLine = styled.div`
  margin-bottom: 20px;
`;

const TextLine = styled.div`
  margin-top: 10px;
`;

export default App;
