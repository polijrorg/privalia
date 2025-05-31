'use client'
import type { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react'

type MotionButtonProps = HTMLMotionProps<"button">& {
  children: ReactNode;
};

function BaseMotionButton({ children, ...props }: MotionButtonProps) {
  return ( 
    <motion.button  
      whileHover={{
        transformOrigin: "center",
        scale: 1.03,
        transition: { duration: .15 },
      }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
    {children}
    </motion.button>
   );
}

export default BaseMotionButton;