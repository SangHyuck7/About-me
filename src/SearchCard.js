import React, { useState, useEffect } from "react";
import styled from "styled-components";
import resume from "./data/resume.json";

import { PersonalProjects, TeamProjects, AllContents } from "./data/resumeURL";

function SearchCard({ content, marginTop, onAnimationComplete }) {
  const [typedText, setTypedText] = useState("");
  const [typeTitle, setTypeTitle] = useState("");
  let resumeText = "";

  if (content === "Contact" || content === "연락처" || content === "contact") {
    resumeText = resume["Contact"];
  } else if (
    content === "Introduce" ||
    content === "소개" ||
    content === "introduce"
  ) {
    resumeText = resume["Introduce"];
  } else if (
    content === "Personal Project" ||
    content === "개인프로젝트" ||
    content === "personal project" ||
    content === "개인 프로젝트" ||
    content === "PersonalProject" ||
    content === "personalproject"
  ) {
    resumeText = resume["PersonalProjects"];
  } else if (
    content === "Team Project" ||
    content === "팀프로젝트" ||
    content === "team project" ||
    content === "팀 프로젝트" ||
    content === "TeamProject" ||
    content === "teamproject"
  ) {
    resumeText = resume["TeamProjects"];
  } else if (
    content === "Education" ||
    content === "교육" ||
    content === "education"
  ) {
    resumeText = resume["Education"];
  } else if (
    content === "All contents" ||
    content === "Allcontents" ||
    content === "모든 콘텐츠" ||
    content === "모든콘텐츠" ||
    content === "All Contents" ||
    content === "AllContents" ||
    content === "all contents" ||
    content === "allcontents"
  ) {
    resumeText = resume["AllContents"];
  }

  useEffect(() => {
    if (
      content === "Contact" ||
      content === "연락처" ||
      content === "contact"
    ) {
      setTypeTitle("Contact");
    } else if (
      content === "Introduce" ||
      content === "소개" ||
      content === "introduce"
    ) {
      setTypeTitle("Introduce");
    } else if (
      content === "Personal Project" ||
      content === "개인프로젝트" ||
      content === "personal project" ||
      content === "개인 프로젝트" ||
      content === "PersonalProject" ||
      content === "personalproject"
    ) {
      setTypeTitle("PersonalProjects");
    } else if (
      content === "Team Project" ||
      content === "팀프로젝트" ||
      content === "team project" ||
      content === "팀 프로젝트" ||
      content === "TeamProject" ||
      content === "teamproject"
    ) {
      setTypeTitle("TeamProjects");
    } else if (
      content === "Education" ||
      content === "교육" ||
      content === "education"
    ) {
      setTypeTitle("Education");
    } else if (
      content === "All contents" ||
      content === "Allcontents" ||
      content === "모든 콘텐츠" ||
      content === "모든콘텐츠" ||
      content === "All Contents" ||
      content === "AllContents" ||
      content === "all contents" ||
      content === "allcontents"
    ) {
      setTypeTitle("AllContents");
    }
  }, [content]);

  useEffect(() => {
    let timer;
    if (typedText.length < resumeText.length) {
      timer = setTimeout(() => {
        setTypedText(resumeText.substr(0, typedText.length + 1));

        if (resumeText.charAt(typedText.length) === "\n") {
          onAnimationComplete();
        }
      }, 80);
    }

    return () => clearTimeout(timer);
  }, [typedText, resumeText, onAnimationComplete]);

  const renderText = (text) => {
    const lines = text.split("\n");
    let linkIndex = 0;

    return lines.map((line, index) => (
      <span key={index}>
        {line.split(" ").map((word, wordIndex) => {
          if (word.startsWith("http")) {
            return (
              <a
                key={wordIndex}
                href={word}
                target="_blank"
                rel="noopener noreferrer"
              >
                {word}
              </a>
            );
          } else if (word === "(링크)" && typeTitle === "PersonalProjects") {
            const url = PersonalProjects[linkIndex];
            linkIndex++;

            return (
              <a
                key={wordIndex}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {word}
              </a>
            );
          } else if (word === "(링크)" && typeTitle === "TeamProjects") {
            const url = TeamProjects[linkIndex];
            linkIndex++;

            return (
              <a
                key={wordIndex}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {word}
              </a>
            );
          } else if (word === "(링크)" && typeTitle === "AllContents") {
            const url = AllContents[linkIndex];
            linkIndex++;

            return (
              <a
                key={wordIndex}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {word}
              </a>
            );
          }
          return word + " ";
        })}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  };

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
          <AiText>{renderText(typedText)}</AiText>
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
  background-color: #343541;
  border: none;
`;

const AiContainer = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #444654;
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
  width: 60%;
  padding: 5px;
  background-color: #343541;
  display: flex;
  align-items: center;
  border: none;
`;

const UserText = styled.p`
  color: #d9d9e3;
  font-size: 18px;
  margin: 10px;
  padding-left: 20px;

  p {
    margin: 10px 0;
  }

  a {
    color: inherit;
  }
`;

const AiText = styled.p`
  color: #d9d9e3;
  font-size: 18px;
  margin: 10px;
  padding-left: 20px;
  line-height: 30px;
  white-space: pre-line;

  a {
    color: inherit;
  }
`;

const AiTextContainer = styled.div`
  width: 60%;
  padding: 5px;
  background-color: #444654;
  display: flex;
  align-items: center;
  border: none;
`;
