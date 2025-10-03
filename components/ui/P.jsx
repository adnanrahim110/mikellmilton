import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";

const P = ({
  className = "",
  children,
  amount = 0.5,
  once = true,
  duration = 1,
  delay = 0,
  variant = variants.fadeRise,
  ...props
}) => {
  return (
    <MotionInView
      as={motion.p}
      v={variant}
      viewport={{ once: once, amount: amount }}
      duration={duration}
      delay={delay}
      className={className}
      {...props}
    >
      {children}
    </MotionInView>
  );
};

export default P;
