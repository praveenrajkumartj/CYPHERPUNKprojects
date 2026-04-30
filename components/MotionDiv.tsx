'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

export default function MotionDiv({ children, ...props }: HTMLMotionProps<'div'>) {
  return <motion.div {...props}>{children}</motion.div>;
}
