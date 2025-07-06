import React from "react";
import ColourfulText from "./ColourfulText";

const ColourfulHeader = ({
  text = "Find movies you'll Enjoy Without the Hassle",
  className = "fancy-text",
}) => {
  // Split the text to identify which part should be colourful
  const words = text.split(" ");

  // Let's make "movies" colourful
  const colourfulWord = "movies";
  const colourfulIndex = words.findIndex((word) =>
    word.toLowerCase().includes(colourfulWord.toLowerCase())
  );

  return (
    <h1 className={`${className} text-center`}>
      {words.map((word, index) => {
        if (index === colourfulIndex) {
          return (
            <React.Fragment key={index}>
              <ColourfulText text={word} />
              {index < words.length - 1 && " "}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index}>
              <span className="text-white">{word}</span>
              {index < words.length - 1 && " "}
            </React.Fragment>
          );
        }
      })}
    </h1>
  );
};

export default ColourfulHeader;
