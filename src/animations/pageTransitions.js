export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const slideIn = (direction = 'right') => ({
  hidden: {
    x: direction === 'right' ? '100%' : direction === 'left' ? '-100%' : 0,
    y: direction === 'down' ? '-100%' : direction === 'up' ? '100%' : 0
  },
  visible: {
    x: 0,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: {
    x: direction === 'right' ? '100%' : direction === 'left' ? '-100%' : 0,
    y: direction === 'down' ? '-100%' : direction === 'up' ? '100%' : 0,
    transition: { duration: 0.3 }
  }
});

export const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.4 }
  }
};
