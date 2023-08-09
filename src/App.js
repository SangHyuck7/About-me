import React, { useState } from "react";
import styled from "styled-components";

import HeaderTitle from "./HeaderTitle";
import SearchCard from "./SearchCard";

function App() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [searchContentArr, setSearchContentArr] = useState([]);

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

  return (
    <Container>
      {isSearch ? <HeaderTitle /> : <Title>Meet Sanghyuk Lee!</Title>}
      {isSearch &&
        searchContentArr.map((content, index) => (
          <SearchCard
            key={index}
            content={content}
            marginTop={index === 0 ? "72px" : "0"}
          />
        ))}
      <InputContainer>
        <InputField
          placeholder="Let's find something!"
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
        />
        <SendButton
          type="button"
          onClick={() => {
            toggleButton();
            addSearchContent(searchContent);
            setSearchContent("");
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
`;

const Title = styled.h1`
  color: #565869;
  position: absolute; // 절대 위치 지정
  top: 40%; // 상단에서 50% 떨어진 곳에 위치
  left: 50%; // 왼쪽에서 50% 떨어진 곳에 위치
  transform: translate(-40%, -50%); // 왼쪽과 위로 각각 50%만큼 이동
  text-align: center; // 텍스트를 중앙 정렬
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SendButton = styled.button`
  background-color: #40414f;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 0 15px 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
