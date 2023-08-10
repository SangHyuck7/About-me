import React, { useState, useEffect } from "react";
import styled from "styled-components";

import resume from "./data/resume.json";
import { keywordMapping } from "./data/keywordMapping";
import {
  NIGHT_MAINCONTAINER_COLOR,
  NIGHT_AICONTAINER_COLOR,
  NIGHT_CHATTEXT_COLOR,
  DAY_MAINCONTAINER_COLOR,
  DAY_AICONTAINER_COLOR,
} from "./constants/color";
import { PersonalProjects, TeamProjects, AllContents } from "./data/resumeURL";

function SearchCard({ content, marginTop, onAnimationComplete, isDarkMode }) {
  const [typedText, setTypedText] = useState("");
  const [typeTitle, setTypeTitle] = useState("");
  const [resumeText, setResumeText] = useState("");

  useEffect(() => {
    let foundText = "";
    for (const keyword in keywordMapping) {
      if (content.includes(keyword)) {
        foundText = resume[keywordMapping[keyword]];
        setTypeTitle(keywordMapping[keyword]);
        break;
      }
    }

    if (!foundText) {
      foundText = resume["MissingSearch"];
    }

    setResumeText(foundText);
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
      <UserContainer style={{ marginTop: marginTop }} isDarkMode={isDarkMode}>
        <UserTextContainer isDarkMode={isDarkMode}>
          <UserProfile />
          <UserText isDarkMode={isDarkMode}>{content}</UserText>
        </UserTextContainer>
      </UserContainer>
      <AiContainer isDarkMode={isDarkMode}>
        <AiTextContainer isDarkMode={isDarkMode}>
          <AiProfile />
          <AiText isDarkMode={isDarkMode}>{renderText(typedText)}</AiText>
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
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_MAINCONTAINER_COLOR : DAY_MAINCONTAINER_COLOR};
  border: none;
`;

const AiContainer = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_AICONTAINER_COLOR : DAY_AICONTAINER_COLOR};
  border: none;
`;

const UserProfile = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: url("/user-icon.png") no-repeat center center;
  background-size: cover;
  background-color: skyblue;
`;

const AiProfile = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: url("/robot-icon.png") no-repeat center center;
  background-size: cover;
  background-color: orange;
`;

const UserTextContainer = styled.div`
  width: 60%;
  padding: 5px;
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_MAINCONTAINER_COLOR : DAY_MAINCONTAINER_COLOR};
  display: flex;
  align-items: center;
  border: none;
`;

const UserText = styled.p`
  color: ${(props) =>
    props.isDarkMode ? NIGHT_CHATTEXT_COLOR : NIGHT_MAINCONTAINER_COLOR};
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
  color: ${(props) =>
    props.isDarkMode ? NIGHT_CHATTEXT_COLOR : NIGHT_MAINCONTAINER_COLOR};
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
  display: flex;
  align-items: center;
  border: none;
  background-color: ${(props) =>
    props.isDarkMode ? NIGHT_AICONTAINER_COLOR : DAY_AICONTAINER_COLOR};
`;
