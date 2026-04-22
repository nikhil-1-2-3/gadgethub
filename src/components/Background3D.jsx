import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Monitor, Headphones, Watch, Gamepad2, Camera, Tablet } from 'lucide-react';

const FloatingDevice = ({ children, delay, duration, x, y, scale, rotation }) => {
  return (
    <motion.div
      className="floating-device"
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: `scale(${scale})`,
      }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, rotation, 0],
        rotateY: [0, rotation * 0.5, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

const Background3D = () => {
  return (
    <div className="bg-3d-container">
      {/* Gradient Orbs */}
      <motion.div
        className="gradient-orb orb-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="gradient-orb orb-2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="gradient-orb orb-3"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Floating 3D Devices */}
      <FloatingDevice delay={0} duration={6} x={10} y={20} scale={1.5} rotation={15}>
        <Smartphone size={80} strokeWidth={1.5} />
      </FloatingDevice>

      <FloatingDevice delay={1} duration={7} x={75} y={15} scale={2} rotation={-20}>
        <Laptop size={100} strokeWidth={1.5} />
      </FloatingDevice>

      <FloatingDevice delay={2} duration={8} x={85} y={60} scale={1.8} rotation={25}>
        <Monitor size={90} strokeWidth={1.5} />
      </FloatingDevice>

      <FloatingDevice delay={0.5} duration={6.5} x={15} y={70} scale={1.6} rotation={-15}>
        <Headphones size={85} strokeWidth={1.5} />
      </FloatingDevice>

      <FloatingDevice delay={1.5} duration={7.5} x={50} y={25} scale={1.3} rotation={30}>
        <Watch size={70} strokeWidth={1.5} />
      </FloatingDevice>

      <FloatingDevice delay={3} duration={9} x={60} y={75} scale={1.4} rotation={-25}>
        <Gamepad2 size={75} strokeWidth={1.5} />
      </FloatingDevice>

      <FloatingDevice delay={2.5} duration={8.5} x={30} y={45} scale={1.2} rotation={20}>
        <Tablet size={65} strokeWidth={1.5} />
      </FloatingDevice>

      <FloatingDevice delay={1.8} duration={7.8} x={90} y={40} scale={1.3} rotation={-18}>
        <Camera size={70} strokeWidth={1.5} />
      </FloatingDevice>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Rotating Ring */}
      <motion.div
        className="rotating-ring"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="rotating-ring ring-2"
        animate={{ rotate: -360 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Background3D;
