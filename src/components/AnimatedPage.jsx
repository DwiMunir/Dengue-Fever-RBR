import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import useIsMobile from '@/hooks/useIsMobile';

const useMotionSettings = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;

  return {
    shouldReduceMotion,
    durations: {
      page: shouldReduceMotion ? 0.18 : 0.5,
      fade: shouldReduceMotion ? 0.2 : 0.6,
      item: shouldReduceMotion ? 0.2 : 0.5,
      hover: shouldReduceMotion ? 0.15 : 0.3,
    },
    offsets: {
      pageY: shouldReduceMotion ? 4 : 20,
      exitY: shouldReduceMotion ? -4 : -15,
      fadeY: shouldReduceMotion ? 8 : 30,
      itemY: shouldReduceMotion ? 6 : 25,
    },
    stagger: {
      children: shouldReduceMotion ? 0.02 : 0.08,
      delay: shouldReduceMotion ? 0.02 : 0.1,
    },
  };
};

// Page transition variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Fade up variants
export const fadeUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Stagger children animation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Scale animation
export const scaleVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Slide in from side
export const slideVariants = {
  left: {
    initial: { x: -60, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  right: {
    initial: { x: 60, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }
};

// Card hover variants
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)'
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  tap: {
    scale: 0.98
  }
};

// Button variants
export const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: { scale: 0.95 }
};

// Floating animation
export const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Pulse animation
export const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Animated page wrapper
export const AnimatedPage = ({ children, className = '' }) => {
  const { durations, offsets } = useMotionSettings();
  const variants = {
    initial: {
      opacity: 0,
      y: offsets.pageY,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: durations.page,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      y: offsets.exitY,
      scale: 0.98,
      transition: {
        duration: durations.hover,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger container
export const StaggerContainer = ({ children, className = '', delay = 0 }) => {
  const { stagger } = useMotionSettings();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger.children,
            delayChildren: delay || stagger.delay
          }
        }
      }}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger item
export const StaggerItem = ({ children, className = '' }) => {
  const { durations, offsets } = useMotionSettings();
  const variants = {
    hidden: { opacity: 0, y: offsets.itemY, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: durations.item,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

// Fade in component
export const FadeIn = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const { durations, offsets } = useMotionSettings();
  const directions = {
    up: { y: offsets.fadeY, x: 0 },
    down: { y: -offsets.fadeY, x: 0 },
    left: { y: 0, x: offsets.fadeY },
    right: { y: 0, x: -offsets.fadeY }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: durations.fade,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated card with hover effect
export const AnimatedCard = ({ children, className = '', onClick }) => {
  const { durations } = useMotionSettings();
  const variants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 3px 10px -3px rgba(0, 0, 0, 0.08)'
    },
    hover: {
      scale: 1.01,
      y: -4,
      boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.12)',
      transition: {
        duration: durations.hover,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated button
export const AnimatedButton = ({ children, className = '', ...props }) => {
  const { durations } = useMotionSettings();
  const variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.04,
      transition: {
        duration: durations.hover,
        ease: 'easeOut'
      }
    },
    tap: { scale: 0.96 }
  };

  return (
    <motion.button
      variants={variants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Section wrapper with scroll animation
export const AnimatedSection = ({ children, className = '' }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
