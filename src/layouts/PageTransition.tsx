import { motion } from "framer-motion";
import type { ReactNode } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
};

// Define la transición para que sea suave
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3,
} as const;

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
