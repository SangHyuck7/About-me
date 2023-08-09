import React, { useState, useEffect } from "react";
import styled from "styled-components";
import resume from "./data/resume.json";

function SearchCard({ content, marginTop }) {
  const [typedText, setTypedText] = useState("");
  let resumeHTML = "";

  if (content === "Contact" || content === "연락처" || content === "contact") {
    resumeHTML = resume["Contact"];
  }

  useEffect(() => {
    let timer;
    if (typedText.length < resumeHTML.length) {
      timer = setTimeout(() => {
        setTypedText(resumeHTML.substr(0, typedText.length + 1));
      }, 100); // 100ms마다 한 글자씩 추가
    }

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [typedText, resumeHTML]);

  return (
    <>
      <UserContainer style={{ marginTop: marginTop }}>
        <UserTextContainer>
          <UserProfile />
          <UserText>{content}</UserText>
        </UserTextContainer>
      </UserContainer>
      <AiContainer>
        <AiTextContainer>
          <AiProfile />
          <AiText dangerouslySetInnerHTML={{ __html: typedText }} />
        </AiTextContainer>
      </AiContainer>
    </>
  );
}

export default SearchCard;

const UserContainer = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: red;
  border: none;
`;

const AiContainer = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: yellow;
  border: none;
`;

const UserProfile = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  background: url("/user-icon.png") no-repeat center center;
  background-size: cover;
  background-color: green;
`;

const AiProfile = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  background: url("/robot-icon.png") no-repeat center center;
  background-size: cover;
  background-color: orange;
`;

const UserTextContainer = styled.div`
  width: 50%;
  padding: 5px;
  /* background-color: #343541; */
  background-color: blue;
  display: flex;
  align-items: center;
  border: none;
`;

const UserText = styled.p`
  color: #d9d9e3;
  font-size: 18px;
  margin: 10px;

  p {
    margin: 10px 0; // 원하는 간격으로 조정
  }

  a {
    color: inherit; // 링크의 색상을 상위 요소와 동일하게 설정
  }
`;

const AiText = styled.p`
  color: #d9d9e3;
  font-size: 18px;
  margin: 10px;

  p {
    margin: 10px 0; // 원하는 간격으로 조정
  }

  a {
    color: inherit; // 링크의 색상을 상위 요소와 동일하게 설정
  }
`;

const AiTextContainer = styled.div`
  width: 50%;
  padding: 5px;
  /* background-color: #343541; */
  background-color: purple;
  display: flex;
  align-items: center;
  border: none;
`;
