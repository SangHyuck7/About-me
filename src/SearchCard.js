import React, { useState, useEffect, useCallback } from "react";
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
import {
  PersonalProjects,
  TeamProjects,
  AllContents,
  resumeURL,
  Careers,
  workExperience,
  studyNotion,
} from "./data/resumeURL";
import { SEARCH_SPLIT_REGEX } from "./utils/regex.ts";

function SearchCard({
  content,
  marginTop,
  onAnimationComplete,
  isDarkMode,
  handleSetIsStop,
  handleSetIsTypingHalted,
  isTypingHalted,
}) {
  const [typedText, setTypedText] = useState("");
  const [typeTitle, setTypeTitle] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [stopText, setStopText] = useState(false);

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
    if (stopText) {
      handleSetIsTypingHalted(false);
      return;
    } else {
      let timer;
      if (typedText.length < resumeText.length) {
        timer = setTimeout(() => {
          setTypedText(resumeText.substr(0, typedText.length + 1));
        }, 50);
      }

      return () => clearTimeout(timer);
    }
  }, [typedText, resumeText]);

  useEffect(() => {
    onAnimationComplete();
    if (!typedText.length && resumeText.length) {
      handleSetIsStop();
    }
    if (typedText.length === resumeText.length && typedText.length) {
      handleSetIsStop();
    }
  }, [typedText, resumeText, handleSetIsStop]);

  useEffect(() => {
    if (isTypingHalted) {
      setStopText(true);
    }
  }, [isTypingHalted, stopText]);

  const renderText = useCallback(
    (text) => {
      const lines = text.split("\n");
      let linkIndex = 0;

      return lines.map((line, index) => (
        <span key={index}>
          {line.split(SEARCH_SPLIT_REGEX).flatMap((segment, segmentIndex) => {
            if (!segment) return [];

            if (segment.startsWith("{") && segment.endsWith("}")) {
              return (
                <CurlyBraces key={segmentIndex}>
                  {segment.substring(1, segment.length - 1)}
                </CurlyBraces>
              );
            }

            if (segment.startsWith("[") && segment.endsWith("]")) {
              return (
                <span key={segmentIndex} style={{ fontWeight: 700 }}>
                  {segment.substring(1, segment.length - 1)}
                </span>
              );
            }

            if (segment.startsWith("<") && segment.endsWith(">")) {
              return (
                <Segment key={segmentIndex}>
                  {segment.substring(1, segment.length - 1)}
                </Segment>
              );
            }

            if (segment === "Work Experience Link") {
              return (
                <a
                  key={segmentIndex}
                  href={workExperience}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {segment}
                </a>
              );
            }

            if (segment === "Study Notion Link") {
              return (
                <a
                  key={segmentIndex}
                  href={studyNotion}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {segment}
                </a>
              );
            }

            if (segment === "Google Drive link" && typeTitle === "ResumeLink") {
              return (
                <a
                  key={segmentIndex}
                  href={resumeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {segment}
                </a>
              );
            }

            return segment.split(" ").map((word, wordIndex) => {
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
              } else if (
                word === "(링크)" &&
                typeTitle === "PersonalProjects"
              ) {
                const url = PersonalProjects[linkIndex++];

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
                const url = TeamProjects[linkIndex++];

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
              } else if (word === "(링크)" && typeTitle === "Careers") {
                const url = Careers[linkIndex++];

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
                const url = AllContents[linkIndex++];

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
              return (
                word + (wordIndex < segment.split(" ").length - 1 ? " " : "")
              );
            });
          })}
          {index < lines.length - 1 && <br />}
        </span>
      ));
    },
    [typeTitle]
  );

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

  @media (min-width: 0px) and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 25px;
    height: 25px;
  }
`;

const AiProfile = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: url("/robot-icon.png") no-repeat center center;
  background-size: cover;
  background-color: orange;
  flex-shrink: 0;

  @media (min-width: 0px) and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 25px;
    height: 25px;
  }
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

  @media (min-width: 0px) and (max-width: 425px) {
    font-size: 12px;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 16px;
  }
`;

const AiText = styled.p`
  color: ${(props) =>
    props.isDarkMode ? NIGHT_CHATTEXT_COLOR : NIGHT_MAINCONTAINER_COLOR};
  font-size: 18px;
  margin: 10px;
  padding-left: 20px;
  line-height: 30px;

  a {
    color: inherit;
  }

  @media (min-width: 0px) and (max-width: 425px) {
    font-size: 12px;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 16px;
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

const CurlyBraces = styled.span`
  font-size: 30px;
  font-weight: 800;

  @media (min-width: 0px) and (max-width: 425px) {
    font-size: 20px;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 25px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 27px;
  }
`;

const Segment = styled.span`
  font-size: 25px;
  font-weight: 700;

  @media (min-width: 0px) and (max-width: 425px) {
    font-size: 15px;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 21px;
  }
`;
