"use client";

import { motion } from "motion/react";
import React from "react";

const AnimatedP = ({
  children,
  className = "",
  margin = "0px 0px -10% 0px",
  amount = 0,
  staggerWord = 0.02,
  staggerChar = 0.001,
  charDuration = 0.25,
}) => {
  const splitTokens = (text) => text.match(/\S+|\s+/g) || [];

  const renderWord = (word, idx, prefix) => (
    <motion.span
      key={`${prefix}-w-${idx}`}
      style={{ display: "inline-block", whiteSpace: "nowrap" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerChar } },
      }}
    >
      {word.split("").map((ch, i) => (
        <motion.span
          key={`${prefix}-w-${idx}-c-${i}`}
          style={{ display: "inline-block" }}
          variants={{
            hidden: { opacity: 0.3 },
            show: {
              opacity: 1,
              transition: { duration: charDuration, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );

  const renderText = (text, prefix) => {
    const tokens = splitTokens(text);
    return tokens.map((tok, i) => {
      if (/^\s+$/.test(tok)) {
        return (
          <span key={`${prefix}-s-${i}`} style={{ whiteSpace: "pre" }}>
            {tok}
          </span>
        );
      }
      return renderWord(tok, i, prefix);
    });
  };

  const renderNode = (node, prefix = "n") => {
    if (node == null || node === false) return null;

    if (typeof node === "string") {
      return renderText(node, prefix);
    }

    if (Array.isArray(node)) {
      return node.flatMap((n, i) => renderNode(n, `${prefix}-${i}`));
    }

    if (React.isValidElement(node)) {
      const { children: inner, ...rest } = node.props || {};
      return React.cloneElement(
        node,
        { ...rest, key: prefix },
        <motion.span
          style={{ display: "inline" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: staggerWord } },
          }}
        >
          {renderNode(inner, `${prefix}-child`)}
        </motion.span>
      );
    }

    return <span key={prefix}>{String(node)}</span>;
  };

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount, margin }}
      variants={{
        hidden: { opacity: 0.3 },
        show: {
          opacity: 1,
          transition: { when: "beforeChildren", staggerChildren: staggerWord },
        },
      }}
      style={{ whiteSpace: "pre-wrap", willChange: "opacity" }}
    >
      <motion.span
        style={{ display: "inline" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: staggerWord } },
        }}
      >
        {renderNode(children)}
      </motion.span>
    </motion.p>
  );
};

export default AnimatedP;
