import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const transition = {
  duration: 1.2,
  ease: [0.83, 0, 0.17, 1],
};

interface ServiceTransitionProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ServiceTransition({ 
  isOpen, 
  onComplete, 
  onClose, 
  children 
}: ServiceTransitionProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Show content after circle expands
      const timer = setTimeout(() => {
        setShowContent(true);
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Circle Reveal Overlay */}
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={transition}
            className="fixed inset-0 z-[9999] bg-[#2A3B70]"
            style={{ pointerEvents: showContent ? 'none' : 'all' }}
          />
          
          {/* Content Modal */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2 
                }}
                className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={onClose}
                />
                
                {/* Modal Content */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {children}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
