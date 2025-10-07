import React from "react";
import ColourfulText from "./ColourfulText";

const ColourfulHeader = ({
  text = "Find movies you'll Enjoy Without the Hassle",
  className = "fancy-text",
}) => {
  const words = text.split(" ");
  const colourfulWord = "movies";
  const colourfulIndex = words.findIndex((word) =>
    word.toLowerCase().includes(colourfulWord.toLowerCase())
  );

  return (
    <>
      <h1 className={`${className} text-center font-sans w-170`}>
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
                <span className="text-white text-6xl">{word}</span>
                {index < words.length - 1 && " "}
              </React.Fragment>
            );
          }
        })}
      </h1>
      <p className="text-zinc-400 mb-40 w-100">See the newest and most popular movies from the most complete movie database!</p>
    </>
  );
};

export default ColourfulHeader;
