"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ColourfulText({ text }) {
  const colors = [
    "rgb(147, 51, 234)",
    "rgb(168, 85, 247)",
    "rgb(196, 181, 253)",
    "rgb(216, 180, 254)",
    "rgb(233, 213, 255)",
    "rgb(245, 243, 255)",
    "rgb(233, 213, 255)",
    "rgb(216, 180, 254)",
    "rgb(196, 181, 253)",
    "rgb(168, 85, 247)",
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      className="inline-block   whitespace-pre font-sans tracking-tight"
    >
      {char}
    </motion.span>
  ));
}
