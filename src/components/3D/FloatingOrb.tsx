
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function FloatingOrb() {
  const [isHovered, setIsHovered] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (orbRef.current) {
        const rect = orbRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;
        
        mouseX.set(deltaX);
        mouseY.set(deltaY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={orbRef}
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, type: "spring" }}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 cursor-pointer"
          animate={{
            rotate: 360,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.3 }
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 blur-md opacity-50 animate-pulse"></div>
          <div className="relative w-full h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
        
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-full right-0 mb-4 px-3 py-2 bg-black/90 text-white text-sm rounded-lg backdrop-blur-sm border border-white/20"
          >
            AI Assistant
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
