import { motion } from "framer-motion";
import type { ReactNode } from "react";

const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),

  in: {
    x: 0,
    opacity: 1,
  },

  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
} as const;

type PageTransitionProps = {
  children: ReactNode;
  direction: number;
};

export default function PageTransition({
  children,
  direction,
}: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      custom={direction}
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
